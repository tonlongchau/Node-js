import createError from 'http-errors'

const validate = schema => (req, res, next) => {
  try {
    const obj = {
      ...req.body,
      ...req.params,
      ...req.query,
    }

    const value = schema.validateSync(obj, {
      abortEarly: false,
      stripUnknown: false,
    })

    Object.assign(req, value)
    return next()
  } catch (error) {
    return next(createError.BadRequest(error.errors))
  }
}

export default validate
