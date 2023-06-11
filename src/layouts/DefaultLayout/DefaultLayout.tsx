import classNames from 'classnames/bind'
import { Menubar } from '../components/Menubar'
import { Header } from '../components/Header'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('menu')}>
        <Menubar />
      </div>
      <div className={cx('main')}>
        <div className={cx('header')}>
          <Header />
        </div>
        <div className={cx('children')}>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
