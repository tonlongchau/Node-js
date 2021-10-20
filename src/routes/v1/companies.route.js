import express from 'express'
import CompaniesCtrl from '../../controllers/companies.controller'
import asyncHandler from '../../utils/asyncHandler'

const router = express.Router()

router
  .route('/')
  .post(asyncHandler(CompaniesCtrl.createCompanies))
  .get(asyncHandler(CompaniesCtrl.getCompanies))

router
  .route('/:companiesId')
  .get(asyncHandler(CompaniesCtrl.getCompany))
  .patch(asyncHandler(CompaniesCtrl.updateCompanies))
  .delete(asyncHandler(CompaniesCtrl.deleteCompanies))

export default router
