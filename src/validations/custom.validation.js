import { string } from 'yup'

const regexObjectId = /^[0-9a-fA-F]{24}$/
const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const custom = {
  password: string().matches(
    regexPassword,
    'Password must contain at least 1 letter and 1 number, and at least 6 or more characters'
  ),
  objectId: string().matches(
    regexObjectId,
    '${label} must be a valid mongo id'
  ),
}

export default custom
