import classNames from 'classnames/bind'
import { RightArrowIcon } from '../Icons'
import styles from './QuickActionTag.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  icon: JSX.Element
  tagRef?: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void)
  getReferenceProps?: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>
  onClick?: () => void
}

function QuickActionTag({ title, icon, onClick, tagRef, getReferenceProps }: Props) {
  const newGetReferenceProps = getReferenceProps ? getReferenceProps() : {}

  return (
    <div className={cx('wrapper')} ref={tagRef} onClick={onClick} {...newGetReferenceProps}>
      <div className={cx('content')}>
        <div className={cx('left-icon')}>{icon}</div>
        <span className={cx('text')}>{title}</span>
      </div>
      <div className={cx('content')}>
        <span className={cx('text')}>Get Started</span>
        <RightArrowIcon className={cx('right-icon')} />
      </div>
    </div>
  )
}

export default QuickActionTag
