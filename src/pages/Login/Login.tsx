import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'

import images from '~/assets/images'
import routes from '~/configs/routes'
import { useAppDispatch } from '~/redux/store'
import { auth } from '~/configs/firebase'
import { setIsAuthenticatedToLS, setProfileToLS } from '~/utils/auth'
import { setCurrentUser, setIsAuthenticated } from '~/redux/authenticateSlice'
import { errorToast, successToast } from '~/utils/toastMessage'
import { LoginSchemaType, loginSchema } from '~/utils/formRules'
import { Button } from '~/components/Button'
import { Copyright } from '~/components/Copyright'
import { DownloadApp } from '~/components/DownloadApp'
import { Label } from '~/components/Label'
import { Slogan } from '~/components/Slogan'
import { Input } from '~/components/Input'
import AuthType from '~/types/auth.type'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const currentUser: AuthType = {
        uid: userCredential.user.uid,
        avatar: userCredential.user.photoURL,
        email: userCredential.user.email as string,
        name: userCredential.user.displayName as string
      }
      setIsAuthenticatedToLS(true)
      setProfileToLS(currentUser)
      dispatch(setIsAuthenticated(true))
      dispatch(setCurrentUser(currentUser))
      successToast('Login success!')
      navigate(routes.home)
    } catch (error: any) {
      errorToast(error.message)
    }
  })

  const moveToRegister = () => {
    navigate(routes.register)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <form className={cx('form')} onSubmit={onSubmit}>
            <div className={cx('form-header')}>Welcome!</div>
            <div className={cx('form-input')}>
              <Label label='Email Address' />
              <Input
                placeholder='peter.parker@gmail.com'
                name='email'
                isRequired='Example@gmail.com'
                error={errors.email?.message}
                register={register}
              />
            </div>
            <div className={cx('form-input')}>
              <Label label='Password' />
              <Input
                placeholder='Enter Your Password'
                name='password'
                type='password'
                isRequired='Upto 8 characters with an Uppercase, symbol and number'
                error={errors.password?.message}
                register={register}
              />
            </div>
            <div className={cx('form-input')}>
              <Button yellow type='submit' className={cx('form-submit')}>
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className={cx('container')}>
        <div className={cx('content', 'right-content')}>
          <img src={images.authRight} alt='bg' className={cx('bg-img')} />
          <Button outline className={cx('login-btn')} onClick={moveToRegister}>
            Create Account
          </Button>
          <Slogan className={cx('slogan')} />
          <DownloadApp />
          <Copyright />
        </div>
      </div>
    </div>
  )
}

export default Login
