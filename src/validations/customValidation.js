import { string, object } from 'yup'

const yupObject = obj => object().shape(obj).noUnknown(true)

const regexObjectId = /^[0-9a-fA-F]{24}$/
const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const custom = {
  password: string()
    .required()
    .matches(
      regexPassword,
      'Password must contain at least 1 letter and 1 number, and at least 6 or more characters'
    ),
  objectId: string()
    .required()
    .matches(regexObjectId, '${label} must be a valid mongo id'),
}

export { yupObject, custom }
