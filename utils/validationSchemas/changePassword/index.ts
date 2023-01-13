import Joi from 'joi'

export default Joi.object(
  {
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,30}$/)
      .required(),
    confirmPassword: Joi.ref('password')
  }
)