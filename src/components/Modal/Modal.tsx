import classNames from 'classnames/bind'
import { XMarkIcon } from '../Icons'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

interface Props {
  refs: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void)
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
  floatingStyles: React.CSSProperties
  children: React.ReactNode
  handleClose: () => void
  title?: string
}

function Modal({ refs, getFloatingProps, title, children, handleClose, floatingStyles }: Props) {
  return (
    <div ref={refs} className={cx('wrapper')} style={floatingStyles} {...getFloatingProps()}>
      <div className={cx('container')}>
        <button className={cx('close')} onClick={handleClose}>
          <XMarkIcon />
        </button>
        <div className={cx('title')}>{title}</div>
        {children}
      </div>
    </div>
  )
}

export default Modal
