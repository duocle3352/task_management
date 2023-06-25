import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'
import { useQueryParams } from '~/hooks'
import styles from './TabBar.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  route: string
}

function TabBar({ title, route }: Props) {
  const params: { [k: string]: string } = useQueryParams()
  const currentSelected = params.selected || 'All Tasks'
  const active: boolean = currentSelected === title

  return (
    <Link
      to={{
        pathname: route,
        search: createSearchParams({
          selected: title
        }).toString()
      }}
      className={cx('wrapper', { active })}
    >
      {title}
    </Link>
  )
}

export default TabBar
