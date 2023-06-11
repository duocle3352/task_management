import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import images from '~/assets/images'
import routes from '~/configs/routes'
import { useAppDispatch } from '~/redux/store'
import { auth } from '~/configs/firebase'
import { successToast, errorToast } from '~/utils/toastMessage'
import { authSchema, AuthSchemaType } from '~/utils/formRules'
import { setIsAuthenticatedToLS, setProfileToLS } from '~/utils/auth'
import { setCurrentUser, setIsAuthenticated } from '~/redux/authenticateSlice'
import { Button } from '~/components/Button'
import { Label } from '~/components/Label'
import { Input } from '~/components/Input'
import { DownloadApp } from '~/components/DownloadApp'
import { Slogan } from '~/components/Slogan'
import { Copyright } from '~/components/Copyright'
import AuthType from '~/types/auth.type'
import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSchemaType>({
    resolver: yupResolver(authSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(userCredential.user, {
        displayName: data.name
      })
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
      successToast('Register success!')
      navigate(routes.home)
    } catch (error: any) {
      errorToast(error.message)
    }
  })

  const moveToLogin = () => {
    navigate(routes.login)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content', 'left-content')}>
          <img src={images.authLeft} alt='bg' className={cx('bg-img')} />
          <Slogan />
          <DownloadApp />
          <Copyright />
        </div>
      </div>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <Button outline className={cx('login-btn')} onClick={moveToLogin}>
            Log In
          </Button>
          <form className={cx('form')} onSubmit={onSubmit}>
            <div className={cx('form-header')}>
              <div className={cx('header')}>Create an Account</div>
              <div className={cx('subheader')}>It's Simpe and Easy!!</div>
            </div>
            <div className={cx('form-input')}>
              <Label label='Full name' />
              <Input
                placeholder='Peter Parker'
                name='name'
                isRequired='Information about the input'
                error={errors.name?.message}
                register={register}
              />
            </div>
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
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
