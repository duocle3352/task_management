import classNames from 'classnames/bind'
import { Button } from '../Button'
import styles from './DownloadApp.module.scss'

const cx = classNames.bind(styles)

function DownloadApp() {
  return (
    <fieldset className={cx('fieldset')}>
      <legend className={cx('legend')}>Get the Mobile App</legend>
      <div className={cx('download')}>
        <Button yellow disabled>
          Download on Apple
        </Button>
        <Button white disabled>
          Download on Android
        </Button>
      </div>
    </fieldset>
  )
}

export default DownloadApp
