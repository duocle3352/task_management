import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'

import routes from '~/configs/routes'
import { StatusTag } from '~/components/StatusTag'
import { RightArrowIcon } from '../Icons'
import { PriorityTag } from '../PriorityTag'
import TaskType from '~/types/task.type'
import styles from './TaskCard.module.scss'

const cx = classNames.bind(styles)

interface Props {
  item: TaskType
}

function TaskCard({ item }: Props) {
  return (
    <div className={cx('col', 'd-3', 'l-4', 'm-4', 'c-6')}>
      <div className={cx('content')}>
        <div className={cx('status')}>
          <PriorityTag type={item.priority} />
          <StatusTag type={item.status} />
        </div>
        <div className={cx('title')}>{item.name}</div>
        <Link
          to={{
            pathname: routes.task,
            search: createSearchParams({
              id: item.id.toString()
            }).toString()
          }}
          className={cx('btn')}
        >
          <span className={cx('btn-inner')}>View Task</span>
          <RightArrowIcon className={cx('btn-icon')} />
        </Link>
      </div>
    </div>
  )
}

export default TaskCard
