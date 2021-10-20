import express from 'express'
import WorkCtrl from '../../controllers/work.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(asyncHandler(WorkCtrl.createWork))
  .get(asyncHandler(WorkCtrl.getWorks))

router
  .route('/:workId')
  .get(asyncHandler(WorkCtrl.getWork))
  .patch(asyncHandler(WorkCtrl.updateWork))
  .delete(asyncHandler(WorkCtrl.deleteWork))

export default router
