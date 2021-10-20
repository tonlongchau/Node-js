import createError from 'http-errors'
import Companies from '../models/Companies'

class CompaniesService {
  /**
   * Find companies by id
   * @param {ObjectId} id
   * @returns {Promise<companies>}
   */
  findById(id) {
    return Companies.findById(id)
  }

  /**
   * Find companies by email
   * @param {string} email
   * @returns {Promise<companies>}
   */
  findByEmail(email) {
    return Companies.findOne({ email })
  }

  /**
   * Get companiess by query(filter, options)
   * @param {Object} filter
   * @param {Object} options
   * @returns {Promise<companies>}
   */
  async query(filter, options) {
    const companies = await Companies.paginate(filter, options)
    return companies
  }

  /**
   * Create companies
   * @param {Object} body
   * @returns {Promise<companies>}
   */
  async create(body) {
    return Companies.create(body)
  }

  /**
   * Update companies by id
   * @param {ObjectId} id
   * @param {Object} body
   * @returns {Promise<companies>}
   */
  async updateById(id, body) {
    const companies = await this.findById(id)

    if (!companies) {
      throw createError.NotFound()
    }

    Object.assign(companies, body)
    await companies.save()
    return companies
  }

  /**
   * Delte companies by id
   * @param {ObjectId} id
   * @returns {Promise<companies>}
   */
  async deleteById(id) {
    const companies = await this.findById(id)
    if (!companies) {
      throw createError.NotFound()
    }
    const result = await companies.remove()
    return result
  }
}

export default new CompaniesService()
