const Joi = require('joi');

const dictionarySchema = Joi.object({
  phone: Joi.string()
    .regex(/^\+[1-9][0-9]{11}$/)
    .required(),
  city: Joi.string().valid('New City', 'Big Town', 'Megapolis', 'Riverside'),
  tariff: Joi.string().valid('Basic', 'Express', 'Premium'),
  booked: Joi.boolean(),
});

module.exports = dictionarySchema;
