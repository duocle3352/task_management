import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { useCalendar } from '~/hooks'
import { priorityOption } from '~/constant'
import { db } from '~/configs/firebase'
import { getProfileFromLS } from '~/utils/auth'
import { TaskSchema } from '~/utils/formRules'
import { Modal } from '../Modal'
import { Label } from '../Label'
import { Input } from '../Input'
import { Dropdown } from '../Dropdown'
import { Calendar } from '../Calendar'
import { Button } from '../Button'
import { LoadingIcon } from '../Icons'
import TaskType from '~/types/task.type'
import AuthType from '~/types/auth.type'
import styles from './UpdateTask.module.scss'

const cx = classNames.bind(styles)
const today = new Date().getTime()

interface Props {
  refs: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void)
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
  floatingStyles: React.CSSProperties
  handleClose: () => void
}

function UpdateTask({ floatingStyles, refs, getFloatingProps, handleClose }: Props) {
  const [selectedPriority, setSelectedPriority] = useState(priorityOption[1])
  const { selectedDate, setSelectedDate } = useCalendar()
  const [isPending, setIsPending] = useState<boolean>(false)
  const currentUser: AuthType = getProfileFromLS()
  const userRef = doc(db, 'data', currentUser.uid)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskType>({
    resolver: yupResolver(TaskSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    const newData: TaskType = {
      ...data,
      id: today,
      priority: selectedPriority as 'low' | 'medium' | 'hight' | 'urgent',
      status: 'in progress',
      dueDate: selectedDate ? selectedDate.getTime() : 0,
      createDate: today
    }
    setIsPending(true)
    await updateDoc(userRef, {
      taskList: arrayUnion(newData)
    })
    setIsPending(false)
    handleClose()
  })

  return (
    <Modal
      title='Create Task'
      floatingStyles={floatingStyles}
      getFloatingProps={getFloatingProps}
      refs={refs}
      handleClose={handleClose}
    >
      <form className={cx('wrapper')} onSubmit={onSubmit}>
        <div className={cx('content')}>
          <Label label='Task Name' />
          <Input name='name' isRequired='Task name is required!' error={errors.name?.message} register={register} />
        </div>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <Label label='Task Priority' />
            <Dropdown options={priorityOption} selected={selectedPriority} setSelected={setSelectedPriority} />
          </div>
          <div className={cx('content')}>
            <Label label='Due Date' />
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
        </div>
        <div className={cx('content')}>
          <Label label='Task Description' />
          <textarea {...register('desc')} className={cx('textarea')} />
        </div>
        <div className={cx('submit-btn')}>
          <Button disabled={isPending}>{isPending ? <LoadingIcon /> : 'Create task'}</Button>
        </div>
      </form>
    </Modal>
  )
}

export default UpdateTask
