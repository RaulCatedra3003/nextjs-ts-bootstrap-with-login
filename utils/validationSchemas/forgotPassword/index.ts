import Joi from 'joi'

export default Joi.object(
  {
    email: Joi.string().email(
      {
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      }
    ).required(),
  }
)