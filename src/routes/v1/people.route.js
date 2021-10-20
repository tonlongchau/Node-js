import express from 'express'
import PeopleCtrl from '../../controllers/people.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(asyncHandler(PeopleCtrl.createPeople))
  .get(asyncHandler(PeopleCtrl.getPeoples))

router
  .route('/:peopleId')
  .get(asyncHandler(PeopleCtrl.getPeople))
  .patch(asyncHandler(PeopleCtrl.updatePeople))
  .delete(asyncHandler(PeopleCtrl.deletePeople))

export default router
