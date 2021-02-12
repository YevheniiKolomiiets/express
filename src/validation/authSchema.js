const Joi = require('joi');

const authSchema = Joi.object({
  login: Joi.string().min(3).max(12).required(),
  password: Joi.string().required().min(3).max(12).required(),
});

module.exports = authSchema;
