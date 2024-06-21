import Joi from "joi";

const titleValidator = Joi.object({
    title: Joi.string().regex(/^[a-zA-Z ]{1,20}$/).messages({
        'string.pattern.base': 'The title should only contain letters'
    })
        .required()
});

export {titleValidator}