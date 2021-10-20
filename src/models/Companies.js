import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { toJSON, paginate } from './plugins'
import { roles } from '../config/roles'

const companiesSchema = mongoose.Schema(
  {
    cName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
companiesSchema.plugin(toJSON)
companiesSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The companies's email
 * @param {ObjectId} [excludecompaniesId] - The id of the companies to be excluded
 * @returns {Promise<boolean>}
 */
companiesSchema.statics.isEmailTaken = async function (
  email,
  excludecompaniesId
) {
  const companies = await this.findOne({
    email,
    _id: { $ne: excludecompaniesId },
  })
  return !!companies
}

/**
 * Check if password matches the companies's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
companiesSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password)
}

companiesSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

/**
 * @typedef companies
 */
const companies = mongoose.model('companies', companiesSchema)

export default companies
