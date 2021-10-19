import createError from 'http-errors'
import User from '../models/User'

class UserService {
  /**
   * Find user by id
   * @param {ObjectId} id
   * @returns {Promise<user>}
   */
  findById(id) {
    return User.findById(id)
  }

  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<user>}
   */
  findByEmail(email) {
    return User.findOne({ email })
  }

  /**
   * Get users by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<users>}
   */
  async query(filter, options) {
    const users = await User.paginate(filter, options)
    return users
  }

  /**
   * Create user
   * @param {Object} body
   * @returns {Promise<user>}
   */
  async create(body) {
    if (await User.isEmailTaken(body.email)) {
      throw createError.BadRequest()
    }
    return User.create(body)
  }

  /**
   * Update user by id
   * @param {ObjectId} id
   * @param {Object} body
   * @returns {Promise<user>}
   */
  async updateById(id, body) {
    const user = await this.findById(id)

    if (!user) {
      throw createError.NotFound()
    }

    if (body.email && (await User.isEmailTaken(body.email, id))) {
      throw createError.BadRequest()
    }

    Object.assign(user, body)
    await user.save()
    return user
  }

  /**
   * Delte user by id
   * @param {ObjectId} id
   * @returns {Promise<user>}
   */
  async deleteById(id) {
    const user = await this.findById(id)
    if (!user) {
      throw createError.NotFound()
    }
    const result = await user.remove()
    return result
  }
}

export default new UserService()
