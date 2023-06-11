import classNames from 'classnames/bind'
import styles from './Slogan.module.scss'

const cx = classNames.bind(styles)

function Slogan({ className }: { className?: string }) {
  return (
    <div className={cx('slogan', className)}>
      Take your <br /> productivity to <br /> the next level.
    </div>
  )
}

export default Slogan
