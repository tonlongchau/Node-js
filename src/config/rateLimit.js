import rateLimit from 'express-rate-limit'

export default rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
