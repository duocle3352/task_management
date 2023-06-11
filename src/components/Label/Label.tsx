import classNames from 'classnames/bind'
import styles from './Label.module.scss'

const cx = classNames.bind(styles)

interface Props {
  label: string
  className?: string
}

function Label({ label, className }: Props) {
  return <div className={cx('wrapper', className)}>{label}</div>
}

export default Label
