import classNames from 'classnames/bind'
import styles from './Copyright.module.scss'

const cx = classNames.bind(styles)

function Copyright() {
  return <div className={cx('copyright')}>Copyright 2023 | DuocLe</div>
}

export default Copyright
