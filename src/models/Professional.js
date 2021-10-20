import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { toJSON, paginate } from './plugins'
import { roles } from '../config/roles'

const professionalSchema = mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
professionalSchema.plugin(toJSON)
professionalSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The professional's email
 * @param {ObjectId} [excludeprofessionalId] - The id of the professional to be excluded
 * @returns {Promise<boolean>}
 */
professionalSchema.statics.isEmailTaken = async function (
  email,
  excludeprofessionalId
) {
  const professional = await this.findOne({
    email,
    _id: { $ne: excludeprofessionalId },
  })
  return !!professional
}

/**
 * Check if password matches the professional's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
professionalSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password)
}

professionalSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

/**
 * @typedef professional
 */
const professional = mongoose.model('professional', professionalSchema)

export default professional
