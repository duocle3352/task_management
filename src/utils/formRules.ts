/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const authSchema = yup.object({
  name: yup.string().required('Please Enter your name!'),
  email: yup.string().email('Please Enter your email!').required('Please Enter your email!'),
  password: yup
    .string()
    .required('Please Enter your password!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
})

export const loginSchema = authSchema.pick(['email', 'password'])
export type AuthSchemaType = yup.InferType<typeof authSchema>
export type LoginSchemaType = yup.InferType<typeof loginSchema>

export const TaskSchema = yup.object({
  name: yup.string().required('Task name is required!'),
  desc: yup.string()
})
