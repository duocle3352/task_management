import classNames from 'classnames/bind'
import styles from './StatusTag.module.scss'

const cx = classNames.bind(styles)

interface Props {
  type: string
  className?: string
}

function StatusTag({ type, className }: Props) {
  return (
    <div className={className}>
      {type === 'pending' && <span className={cx('inner', 'pending')}>{type}</span>}
      {type === 'in progress' && <span className={cx('inner', 'in-progress')}>{type}</span>}
      {type === 'completed' && <span className={cx('inner', 'completed')}>{type}</span>}
    </div>
  )
}

export default StatusTag
