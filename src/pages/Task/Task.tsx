import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useClick, useFloating, useInteractions } from '@floating-ui/react'
import { doc, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom'

import useQueryParams from '~/hooks/useQueryParams'
import images from '~/assets/images'
import routes from '~/configs/routes'
import { db } from '~/configs/firebase'
import { getProfileFromLS } from '~/utils/auth'
import { Button } from '~/components/Button'
import { UpdateTask } from '~/components/UpdateTask'
import { TabBar } from '~/components/TabBar'
import { TaskCard } from '~/components/TaskCard'
import { LeftArrowIcon } from '~/components/Icons'
import AuthType from '~/types/auth.type'
import TaskType from '~/types/task.type'
import styles from './Task.module.scss'

const cx = classNames.bind(styles)

function Task() {
  const params = useQueryParams()
  const currentUser: AuthType = getProfileFromLS()
  const [listTask, setListTask] = useState<TaskType[]>([])
  const [detailTask, setDetailTask] = useState<TaskType | undefined>(undefined)
  const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpenCreateTask,
    onOpenChange: setIsOpenCreateTask
  })
  const click = useClick(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  const handleCloseCreateTask = () => {
    setIsOpenCreateTask(false)
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'data', currentUser.uid), (doc) => {
      const tasksData: TaskType[] = doc.data()?.taskList.reverse() || []
      if (params.selected && params.selected !== 'All Tasks') {
        const newTasksData: TaskType[] = tasksData.filter((task) => task.status === params.selected.toLowerCase())
        setListTask(newTasksData)
      } else {
        setListTask(tasksData)
      }
      if (params.id) {
        const currentTask = tasksData.find((task) => task.id.toString() === params.id)
        setDetailTask(currentTask)
      } else {
        setDetailTask(undefined)
      }
    })
    return () => unsub()
  }, [currentUser.uid, params.selected, params.id])

  console.log(detailTask)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <p>Task</p>
          <p className={cx('subtitle')}>Your tasks in your space.</p>
        </div>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <Button>Create a task</Button>
        </div>
      </div>
      <div className={cx('container')}>
        {/* no task */}
        {!params.id && listTask.length < 1 && (
          <div className={cx('no-task')}>
            <img src={images.noTask} alt='no task' />
            <p className={cx('no-task-title')}>No Tasks Yet</p>
            <div className={cx('no-task-desc')}>
              <p>You have no task created in your workspace yet.</p>
              <p>Get productive. Create a Task Now.</p>
            </div>
            <div ref={refs.setReference} {...getReferenceProps()}>
              <Button>Create a task</Button>
            </div>
          </div>
        )}
        {/* have task */}
        {!params.id && listTask.length > 0 && (
          <>
            <div className={cx('task-tab')}>
              <TabBar title='All Tasks' route={routes.task} />
              <TabBar title='Pending' route={routes.task} />
              <TabBar title='In Progress' route={routes.task} />
              <TabBar title='Completed' route={routes.task} />
            </div>
            <div className={cx('row')}>
              {listTask.map((task) => (
                <TaskCard key={task.id} item={task} />
              ))}
            </div>
          </>
        )}
        {/* detail task */}
        {params.id && (
          <div>
            <Link to={routes.task} className={cx('back-link')}>
              <LeftArrowIcon />
            </Link>
            {params.id}
          </div>
        )}
      </div>
      {isOpenCreateTask && (
        <UpdateTask
          floatingStyles={floatingStyles}
          refs={refs.setFloating}
          getFloatingProps={getFloatingProps}
          handleClose={handleCloseCreateTask}
        />
      )}
    </div>
  )
}

export default Task
