import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'task-management-b5dde.firebaseapp.com',
  projectId: 'task-management-b5dde',
  storageBucket: 'task-management-b5dde.appspot.com',
  messagingSenderId: '482748551846',
  appId: '1:482748551846:web:2e16cf991b59d6d9b85a67',
  measurementId: 'G-JESF3HXZZL',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
