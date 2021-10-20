import express from 'express'
import userRoute from './user.route'
import peopleRoute from './people.route'
import professionalRoute from './professional.route'
import workRoute from './work.route'
import companiesRoute from './companies.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/peoples',
    route: peopleRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/professionals',
    route: professionalRoute,
  },
  {
    path: '/works',
    route: workRoute,
  },
  {
    path: '/companies',
    route: companiesRoute,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
