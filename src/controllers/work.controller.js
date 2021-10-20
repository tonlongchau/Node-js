import createError from 'http-errors'
import pick from '../utils/pick'
import workService from '../services/work.service'

class WorkCtrl {
  /**
   * @GET api/v1/users
   * @access public
   */
  async getWorks(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await workService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/users/:userId
   * @access public
   */
  async getWork(req, res) {
    const work = await workService.findById(req.params.workId)
    if (!work) {
      throw createError.NotFound()
    }
    res.send(work)
  }

  /**
   * @POST api/v1/users/
   * @access private
   */
  async createWork(req, res) {
    const work = await workService.create(req.body)
    res.status(201).send(work)
  }

  /**
   * @PATCH api/v1/users/:userId
   * @access private
   */
  async updateWork(req, res) {
    const work = await workService.updateById(req.params.workId, req.body)
    res.send(work)
  }

  /**
   * @DELETE api/v1/users/:userId
   * @access private
   */
  async deleteWork(req, res) {
    const work = await workService.deleteById(req.params.workId)
    res.status(200).json({
      success: true,
      message: `Remove work: ${work.id} successfully!!!`,
    })
  }
}

export default new WorkCtrl()
