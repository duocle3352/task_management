import AuthType from '~/types/auth.type'

const IS_AUTHENTICATED = 'isAuthenticated'
const PROFILE = 'profile'

export const setIsAuthenticatedToLS = (data: boolean) => {
  return localStorage.setItem(IS_AUTHENTICATED, JSON.stringify(data))
}

export const getIsAuthenticatedFromLS = () => {
  const result = localStorage.getItem(IS_AUTHENTICATED)
  return result ? JSON.parse(result) : false
}

export const setProfileToLS = (data: AuthType | null) => {
  return localStorage.setItem(PROFILE, JSON.stringify(data))
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem(PROFILE)
  return result ? JSON.parse(result) : null
}

export const clearAuthInLS = () => {
  localStorage.removeItem(IS_AUTHENTICATED)
  localStorage.removeItem(PROFILE)
}
