import classNames from 'classnames/bind'
import { ChevRonDoubleDownIcon, ChevRonDoubleUpIcon, ChevronDownIcon, ExclamationIcon } from '../Icons'
import styles from './PriorityTag.module.scss'

const cx = classNames.bind(styles)

interface Props {
  type: string
  className?: string
}
//  'low' | 'medium' | 'hight' | 'urgent'

function PriorityTag({ type, className }: Props) {
  return (
    <div className={className}>
      {type === 'low' && (
        <span className={cx('inner', 'low')}>
          <ChevRonDoubleDownIcon className={cx('icon')} />
          {type}
        </span>
      )}
      {type === 'medium' && (
        <span className={cx('inner', 'medium')}>
          <ChevronDownIcon className={cx('icon')} />
          {type}
        </span>
      )}
      {type === 'hight' && (
        <span className={cx('inner', 'hight')}>
          <ChevRonDoubleUpIcon className={cx('icon')} />
          {type}
        </span>
      )}
      {type === 'urgent' && (
        <span className={cx('inner', 'urgent')}>
          <ExclamationIcon className={cx('icon')} />
          {type}
        </span>
      )}
    </div>
  )
}

export default PriorityTag
