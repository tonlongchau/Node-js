import * as yup from 'yup'
import custom from './custom.validation'

const createPeople = {
  email: yup.string().required().email(),
  password: custom.password.required(),
  name: yup.string().required(),
  role: yup.mixed().oneOf(['people', 'admin']).required(),
}

const getPeoples = {
  name: yup.string(),
  role: yup.string(),
  sortBy: yup.string(),
  limit: yup.number().integer(),
  page: yup.number().integer(),
}

const getPeople = {
  peopleId: custom.objectId.label('peopleId'),
}

const updatePeople = {
  peopleId: custom.objectId.label('peopleId'),
  email: yup.string().email(),
  password: custom.password,
  name: yup.string(),
  role: yup.string(),
}

const deletePeople = {
  peopleId: custom.objectId.label('peopleId'),
}

export default {
  createPeople,
  getPeoples,
  getPeople,
  updatePeople,
  deletePeople,
}
