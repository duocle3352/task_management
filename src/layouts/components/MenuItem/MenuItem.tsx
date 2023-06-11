import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import styles from './MenuItem.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  route: string
  icon?: JSX.Element
}

function MenuItem({ title, route, icon }: Props) {
  return (
    <NavLink to={route} className={({ isActive }) => cx('link', { active: isActive })}>
      {icon}
      {title}
    </NavLink>
  )
}

export default MenuItem
