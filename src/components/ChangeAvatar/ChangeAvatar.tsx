import classNames from 'classnames/bind'
import { useEffect, useId, useState } from 'react'
import { updateProfile, type User as FirebaseUser } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import images from '~/assets/images'
import routes from '~/configs/routes'
import { auth, storage } from '~/configs/firebase'
import { Modal } from '../Modal'
import styles from './ChangeAvatar.module.scss'

const cx = classNames.bind(styles)

interface Props {
  floatingStyles: React.CSSProperties
  refs: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void)
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
  handleClose: () => void
}

function ChangeAvatar({ floatingStyles, refs, getFloatingProps, handleClose }: Props) {
  const id = useId()
  const navigate = useNavigate()
  const user: FirebaseUser = auth.currentUser as FirebaseUser
  const [avatar, setAvatar] = useState<File | null>(null)
  const [per, setPerc] = useState<number>(100)

  useEffect(() => {
    if (avatar) {
      const uploadAvatar = () => {
        const name = new Date().getTime() + avatar.name
        const storageRef = ref(storage, name)
        const uploadTask = uploadBytesResumable(storageRef, avatar)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setPerc(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const upload = async () => {
                await updateProfile(auth.currentUser as FirebaseUser, {
                  photoURL: downloadURL
                })
                navigate(routes.home)
              }
              upload()
            })
          }
        )
      }
      uploadAvatar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, user])

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.files ? e.target.files[0] : null)
  }

  return (
    <Modal
      title='Upoad your Profile Picture'
      refs={refs}
      floatingStyles={floatingStyles}
      getFloatingProps={getFloatingProps}
      handleClose={handleClose}
    >
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <img src={user.photoURL || images.defaultAvatar} alt='avatar' />
          <label htmlFor={per < 100 ? '' : id} className={cx('change-label', { disabled: per < 100 })}>
            {per < 100 ? `${per}%` : 'Upload Avatar'}
          </label>
          <input id={id} type='file' onChange={handleChangeAvatar} className={cx('change-input')} />
        </div>
      </div>
    </Modal>
  )
}

export default ChangeAvatar
