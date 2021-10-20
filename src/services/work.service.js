import createError from 'http-errors'
import Work from '../models/Work'

class WorkService {
  /**
   * Find work by id
   * @param {ObjectId} id
   * @returns {Promise<work>}
   */
  findById(id) {
    return Work.findById(id)
  }

  /**
   * Find work by email
   * @param {string} email
   * @returns {Promise<work>}
   */
  findByEmail(email) {
    return Work.findOne({ email })
  }

  /**
   * Get works by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<works>}
   */
  async query(filter, options) {
    const works = await Work.paginate(filter, options)
    return works
  }

  /**
   * Create work
   * @param {Object} body
   * @returns {Promise<work>}
   */
  async create(body) {
    return Work.create(body)
  }

  /**
   * Update work by id
   * @param {ObjectId} id
   * @param {Object} body
   * @returns {Promise<work>}
   */
  async updateById(id, body) {
    const work = await this.findById(id)

    if (!work) {
      throw createError.NotFound()
    }

    Object.assign(work, body)
    await work.save()
    return work
  }

  /**
   * Delte work by id
   * @param {ObjectId} id
   * @returns {Promise<work>}
   */
  async deleteById(id) {
    const work = await this.findById(id)
    if (!work) {
      throw createError.NotFound()
    }
    const result = await work.remove()
    return result
  }
}

export default new WorkService()
