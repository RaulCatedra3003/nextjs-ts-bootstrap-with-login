import Joi from 'joi'

export default Joi.object(
  {
    name: Joi.string().min(3).max(30),
    surname: Joi.string().min(3).max(40),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,30}$/),
    confirmPassword: Joi.ref('password')
  }
)
