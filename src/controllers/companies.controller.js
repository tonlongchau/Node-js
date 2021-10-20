import createError from 'http-errors'
import pick from '../utils/pick'
import companiesService from '../services/companies.service'

class CompaniesCtrl {
  /**
   * @GET api/v1/users
   * @access public
   */
  async getCompanies(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await companiesService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/users/:userId
   * @access public
   */
  async getCompany(req, res) {
    const companies = await companiesService.findById(req.params.companiesId)
    if (!companies) {
      throw createError.NotFound()
    }
    res.send(companies)
  }

  /**
   * @POST api/v1/users/
   * @access private
   */
  async createCompanies(req, res) {
    const companies = await companiesService.create(req.body)
    res.status(201).send(companies)
  }

  /**
   * @PATCH api/v1/users/:userId
   * @access private
   */
  async updateCompanies(req, res) {
    const companies = await companiesService.updateById(
      req.params.companiesId,
      req.body
    )
    res.send(companies)
  }

  /**
   * @DELETE api/v1/users/:userId
   * @access private
   */
  async deleteCompanies(req, res) {
    const companies = await companiesService.deleteById(req.params.companiesId)
    res.status(200).json({
      success: true,
      message: `Remove companies: ${companies.id} successfully!!!`,
    })
  }
}

export default new CompaniesCtrl()
