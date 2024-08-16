// import Joi from 'joi'

// export const signinSchema = Joi.object({
// 	email: Joi.string().required(),
// 	password: Joi.string().required(),
// })

// export const signupSchema = Joi.object({
// 	email: Joi.string()
// 		.email({
// 			minDomainSegments: 2,
// 			tlds: { allow: ['com', 'net'] },
// 		})
// 		.required(),
// 	password: Joi.string()
// 		.required()
// 		.pattern(
// 			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
// 		),
// 	name: Joi.string().required(),
// })
