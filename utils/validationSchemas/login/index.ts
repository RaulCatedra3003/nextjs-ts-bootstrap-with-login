import Joi from 'joi'

export default Joi.object(
  {
    email: Joi.string().email(
      {
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      }
    ).required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,30}$/)
      .required(),
  }
)