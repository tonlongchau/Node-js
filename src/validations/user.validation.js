import * as yup from 'yup'
import custom from './custom.validation'

const createUser = {
  email: yup.string().required().email(),
  password: custom.password.required(),
  name: yup.string().required(),
  role: yup.mixed().oneOf(['user', 'admin']).required(),
}

const getUsers = {
  name: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getUser = {
  userId: custom.objectId.label('userId'),
}

const updateUser = {
  userId: custom.objectId.label('userId'),
  email: yup.string().email(),
  password: custom.password,
  name: yup.string(),
  role: yup.string(),
}

const deleteUser = {
  userId: custom.objectId.label('userId'),
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
