import classNames from 'classnames/bind'
import { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  red?: boolean
  green?: boolean
  yellow?: boolean
  white?: boolean
  white_blur?: boolean
  outline?: boolean
  small?: boolean
  large?: boolean
  className?: string
}

function Button({
  children,
  red,
  green,
  yellow,
  white,
  white_blur,
  outline,
  small,
  large,
  disabled,
  className,
  ...passProps
}: Props) {
  const currentClassName = cx('wrapper', className, {
    red,
    green,
    yellow,
    white,
    white_blur,
    outline,
    disabled,
    small,
    large
  })

  return (
    <button className={currentClassName} {...passProps}>
      {children}
    </button>
  )
}

export default Button
