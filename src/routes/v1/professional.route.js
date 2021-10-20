import express from 'express'
import ProfessionalCtrl from '../../controllers/professional.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(asyncHandler(ProfessionalCtrl.createProfessional))
  .get(asyncHandler(ProfessionalCtrl.getProfessionals))

router
  .route('/:professionalId')
  .get(asyncHandler(ProfessionalCtrl.getProfessional))
  .patch(asyncHandler(ProfessionalCtrl.updateProfessional))
  .delete(asyncHandler(ProfessionalCtrl.deleteProfessional))

export default router
