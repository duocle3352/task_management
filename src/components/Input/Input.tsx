import classNames from 'classnames/bind'
import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types'
import { EyeIcon, EyeSlashIcon } from '../Icons'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password'
  value?: string
  placeholder?: string
  error?: string
  isRequired?: string
  className?: string
  rules?: RegisterOptions
  register?: UseFormRegister<any>
}

function Input({ type = 'text', value, name, placeholder, error, isRequired, className, rules, register }: Props) {
  const currentRegister = register && name ? register(name, { ...rules, value }) : {}
  const [defaultType, setDefaultType] = useState<typeof type>(type)
  const handleShowPassword = () => {
    setDefaultType((prev) => (prev === 'text' ? 'password' : 'text'))
  }

  return (
    <>
      <div className={cx('wrapper')}>
        <input placeholder={placeholder} type={defaultType} className={cx('input', className)} {...currentRegister} />
        {type === 'password' && (
          <div className={cx('icon')} onClick={handleShowPassword}>
            {defaultType === 'password' ? <EyeSlashIcon /> : <EyeIcon />}
          </div>
        )}
      </div>
      {(isRequired || error) && (
        <div className={cx('description', { error: Boolean(error) })}>{error || isRequired}</div>
      )}
    </>
  )
}

export default Input
