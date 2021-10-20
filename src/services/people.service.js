import createError from 'http-errors'
import People from '../models/People'

class PeopleService {
  /**
   * Find people by id
   * @param {ObjectId} id
   * @returns {Promise<people>}
   */
  findById(id) {
    return People.findById(id)
  }

  /**
   * Find people by email
   * @param {string} email
   * @returns {Promise<people>}
   */
  findByEmail(email) {
    return People.findOne({ email })
  }

  /**
   * Get peoples by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<peoples>}
   */
  async query(filter, options) {
    const peoples = await People.paginate(filter, options)
    return peoples
  }

  /**
   * Create people
   * @param {Object} body
   * @returns {Promise<people>}
   */
  async create(body) {
    return People.create(body)
  }

  /**
   * Update people by id
   * @param {ObjectId} id
   * @param {Object} body
   * @returns {Promise<people>}
   */
  async updateById(id, body) {
    const people = await this.findById(id)

    if (!people) {
      throw createError.NotFound()
    }

    Object.assign(people, body)
    await people.save()
    return people
  }

  /**
   * Delte people by id
   * @param {ObjectId} id
   * @returns {Promise<people>}
   */
  async deleteById(id) {
    const people = await this.findById(id)
    if (!people) {
      throw createError.NotFound()
    }
    const result = await people.remove()
    return result
  }
}

export default new PeopleService()
