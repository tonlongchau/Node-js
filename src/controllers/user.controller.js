import createError from 'http-errors'
import pick from '../utils/pick'
import userService from '../services/user.service'

class UserCtrl {
  /**
   * @GET api/v1/users
   * @access public
   */
  async getUsers(req, res) {
    const filter = pick(req.query, ['name', 'role'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await userService.query(filter, options)
    res.send(result)
  }

  /**
   * @GET api/v1/users/:userId
   * @access public
   */
  async getUser(req, res) {
    const user = await userService.findById(req.params.userId)
    if (!user) {
      throw createError.NotFound()
    }
    res.send(user)
  }

  /**
   * @POST api/v1/users/
   * @access private
   */
  async createUser(req, res) {
    const user = await userService.create(req.body)
    res.status(201).send(user)
  }

  /**
   * @PATCH api/v1/users/:userId
   * @access private
   */
  async updateUser(req, res) {
    const user = await userService.updateById(req.params.userId, req.body)
    res.send(user)
  }

  /**
   * @DELETE api/v1/users/:userId
   * @access private
   */
  async deleteUser(req, res) {
    const user = await userService.deleteById(req.params.userId)
    res.status(200).json({
      success: true,
      message: `Remove user: ${user.id} successfully!!!`,
    })
  }
}

export default new UserCtrl()
