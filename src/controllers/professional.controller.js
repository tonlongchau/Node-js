import createError from 'http-errors'
import pick from '../utils/pick'
import professionalService from '../services/professional.service'

class ProfessionalCtrl {
  /**
   * @GET api/v1/users
   * @access public
   */
  async getProfessionals(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await professionalService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/users/:userId
   * @access public
   */
  async getProfessional(req, res) {
    const professional = await professionalService.findById(
      req.params.professionalId
    )
    if (!professional) {
      throw createError.NotFound()
    }
    res.send(professional)
  }

  /**
   * @POST api/v1/users/
   * @access private
   */
  async createProfessional(req, res) {
    const professional = await professionalService.create(req.body)
    res.status(201).send(professional)
  }

  /**
   * @PATCH api/v1/users/:userId
   * @access private
   */
  async updateProfessional(req, res) {
    const professional = await professionalService.updateById(
      req.params.professionalId,
      req.body
    )
    res.send(professional)
  }

  /**
   * @DELETE api/v1/users/:userId
   * @access private
   */
  async deleteProfessional(req, res) {
    const professional = await professionalService.deleteById(
      req.params.professionalId
    )
    res.status(200).json({
      success: true,
      message: `Remove professional: ${professional.id} successfully!!!`,
    })
  }
}

export default new ProfessionalCtrl()
