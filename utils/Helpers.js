const Joi = require('joi')

module.exports = {
    createError: (code, message, validation) => ({ code, message, validation}),
    validationSchemas: {
        loginSchema: Joi.object({
            email: Joi.string().required(),
            email: Joi.string().email(),
            password: Joi.string().required()
        }),
        registerSchema: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            mobile: Joi.string().required(),
            password: Joi.string().required()
        }),
        addCategorySchema: Joi.object({
            ar_name: Joi.string().required(),
            en_name: Joi.string().required()
        }),
    }
};
