import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { toJSON, paginate } from './plugins'
import { roles } from '../config/roles'

const peopleSchema = mongoose.Schema(
  {
    peopleName: {
      type: String,
      required: true,
      trim: true,
    },
    sex: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
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
peopleSchema.plugin(toJSON)
peopleSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The people's email
 * @param {ObjectId} [excludepeopleId] - The id of the people to be excluded
 * @returns {Promise<boolean>}
 */
peopleSchema.statics.isEmailTaken = async function (email, excludepeopleId) {
  const people = await this.findOne({ email, _id: { $ne: excludepeopleId } })
  return !!people
}

/**
 * Check if password matches the people's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
peopleSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password)
}

peopleSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

/**
 * @typedef people
 */
const people = mongoose.model('people', peopleSchema)

export default people
