import classNames from 'classnames/bind'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import routes from '~/configs/routes'
import images from '~/assets/images'
import { useAppDispatch } from '~/redux/store'
import { toggleMenu } from '~/redux/menuSlice'
import { getProfileFromLS } from '~/utils/auth'
import { BellIcon, GlassIcon, MenuIcon } from '~/components/Icons'
import AuthType from '~/types/auth.type'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>('')
  const currentUser: AuthType = getProfileFromLS()

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleToggleMenuInTabletAndMobile = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className={cx('wrapper', 'row')}>
      <div className={cx('col', 'd-0', 'l-0', 'm-1', 'c-4')}>
        <button onClick={handleToggleMenuInTabletAndMobile}>
          <MenuIcon className={cx('menu-icon')} />
        </button>
      </div>
      <div className={cx('col', 'd-5', 'l-6', 'm-8', 'search-box')}>
        <input
          value={searchValue}
          type='text'
          placeholder='Search your task here...'
          className={cx('search-input')}
          onChange={handleChangeValue}
        />
        <GlassIcon className={cx('icon')} />
      </div>
      <div className={cx('col', 'd-2', 'l-3', 'm-3', 'c-8', 'd-o-5', 'l-o-3', 'right-box')}>
        <BellIcon className={cx('icon')} />
        <Link to={routes.profile} className={cx('user')}>
          <img src={currentUser.avatar || images.defaultAvatar} alt='avatar' className={cx('avatar')} />
          <div className={cx('name')}>{currentUser.name}</div>
        </Link>
      </div>
    </div>
  )
}

export default Header
