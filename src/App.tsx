import { onAuthStateChanged } from 'firebase/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth } from './configs/firebase'
import { useRoutesElement } from './hooks'
import { useAppDispatch } from './redux/store'
import { setCurrentUser, setIsAuthenticated } from './redux/authenticateSlice'
import { setIsAuthenticatedToLS, setProfileToLS } from './utils/auth'
import AuthType from './types/auth.type'

function App() {
  const dispatch = useAppDispatch()
  const routeElements = useRoutesElement()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const currentUser: AuthType = {
        uid: user.uid,
        avatar: user.photoURL,
        email: user.email as string,
        name: user.displayName as string
      }
      setIsAuthenticatedToLS(true)
      setProfileToLS(currentUser)
      dispatch(setIsAuthenticated(true))
      dispatch(setCurrentUser(currentUser))
    } else {
      setIsAuthenticatedToLS(false)
      setProfileToLS(null)
      dispatch(setIsAuthenticated(false))
      dispatch(setCurrentUser(null))
    }
  })
  return (
    <div className='App'>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
