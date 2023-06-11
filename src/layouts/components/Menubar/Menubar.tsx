import classNames from 'classnames/bind'
import { useState, useId } from 'react'
import { useFloating, useClick, useInteractions, FloatingPortal } from '@floating-ui/react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

import images from '~/assets/images'
import routes from '~/configs/routes'
import { RootState, useAppDispatch } from '~/redux/store'
import { auth } from '~/configs/firebase'
import { clearAuthInLS } from '~/utils/auth'
import { toggleMenu } from '~/redux/menuSlice'
import { setCurrentUser, setIsAuthenticated } from '~/redux/authenticateSlice'
import { Button } from '~/components/Button'
import { MenuItem } from '../MenuItem'
import { ClipboardIcon, MenuIcon, SettingIcon, Squares4Icon, UserIcon } from '~/components/Icons'
import { Modal } from '~/components/Modal'
import styles from './Menubar.module.scss'

const cx = classNames.bind(styles)

function Menubar() {
  const id = useId()
  const dispatch = useAppDispatch()
  const isOpenMenu: boolean = useSelector((state: RootState) => state.menu.isOpenMenu)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })
  const click = useClick(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  const handleLogout = async () => {
    await signOut(auth)
    clearAuthInLS()
    dispatch(setIsAuthenticated(false))
    dispatch(setCurrentUser(null))
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleToggleMenuInTabletAndMobile = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className={cx('wrapper', { active: isOpenMenu })}>
      <div className={cx('container')}>
        <div className={cx('logo-content')}>
          <button onClick={handleToggleMenuInTabletAndMobile} className={cx('menu-toggle')}>
            <MenuIcon className={cx('menu-icon')} />
          </button>
          <Link to={routes.home} className={cx('logo')}>
            <img src={images.logo} alt='logo' />
          </Link>
        </div>
        <div className={cx('menu-item')}>
          <MenuItem route={routes.home} title='Overview' icon={<Squares4Icon />} />
          <MenuItem route={routes.task} title='Task' icon={<ClipboardIcon />} />
          <MenuItem route={routes.profile} title='Profile' icon={<UserIcon />} />
          <MenuItem route={routes.setting} title='Setting' icon={<SettingIcon />} />
        </div>
      </div>
      <div className={cx('logout-btn')} ref={refs.setReference} {...getReferenceProps()}>
        <Button red>Log Out</Button>
      </div>
      {isOpen && (
        <FloatingPortal id={id}>
          <Modal
            title='You are about to LogOut'
            refs={refs.setFloating}
            floatingStyles={floatingStyles}
            getFloatingProps={getFloatingProps}
            handleClose={handleCloseModal}
          >
            <div className={cx('logout-content')}>
              <div className={cx('logout-subtitle')}>
                You can always log on to your task manager and continue from where you left off..
              </div>
              <div className={cx('logout-confirm-btn')}>
                <Button onClick={handleCloseModal}>No, This was a Mistake</Button>
                <Button red onClick={handleLogout}>
                  Yes, Log Me Out
                </Button>
              </div>
            </div>
          </Modal>
        </FloatingPortal>
      )}
    </div>
  )
}

export default Menubar
