import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClick, useFloating, useInteractions } from '@floating-ui/react'
import { doc, getDoc } from 'firebase/firestore'

import routes from '~/configs/routes'
import { db } from '~/configs/firebase'
import { getProfileFromLS } from '~/utils/auth'
import { QuickActionTag } from '~/components/QuickActionTag'
import { OnboardingIcon, WorkSpaceIcon } from '~/components/Icons'
import { ChangeAvatar } from '~/components/ChangeAvatar'
import TaskType from '~/types/task.type'
import AuthType from '~/types/auth.type'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  const navigate = useNavigate()
  const user: AuthType = getProfileFromLS()
  const [isOpen, setIsOpen] = useState(false)
  const [taskList, setTaskList] = useState<TaskType[]>([])

  useEffect(() => {
    const fetchAPI = async () => {
      const docRef = doc(db, 'data', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setTaskList(data.taskList)
      } else {
        setTaskList([])
      }
    }

    fetchAPI()
  }, [user.uid])

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })
  const click = useClick(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleMoveToCreateNewTask = () => {
    navigate(routes.task)
  }

  return (
    <div>
      <div className={cx('greet-content')}>
        <div className={cx('greet')}>{`HI ${user.name},`}</div>
        <div className={cx('sub-greet')}>Welcome to Task Management</div>
      </div>
      <div className={cx('slider-content')}>
        <div className={cx('slider-bg')} />
        <div className={cx('slider-inner')}>
          <p className={cx('maxim')}>
            Success is not final; failure is not fatal: It is the courage to continue that counts.
          </p>
          <p className={cx('author')}>-Winston S. Churchill</p>
        </div>
      </div>
      <div className={cx('action-content')}>
        <div className={cx('action-title')}>
          {!user.avatar || taskList.length === 0 ? "Let's get you started" : 'Tasks for Today'}
        </div>
        {!user.avatar && (
          <QuickActionTag
            title={`Hey ${user.name}, update your profile picture`}
            icon={<OnboardingIcon />}
            tagRef={refs.setReference}
            getReferenceProps={getReferenceProps}
          />
        )}
        {taskList.length === 0 && (
          <QuickActionTag
            title='Create your first task in your workspace'
            icon={<WorkSpaceIcon />}
            onClick={handleMoveToCreateNewTask}
          />
        )}
      </div>
      {/* change avatar modal */}
      {isOpen && (
        <ChangeAvatar
          floatingStyles={floatingStyles}
          refs={refs.setFloating}
          getFloatingProps={getFloatingProps}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Home
