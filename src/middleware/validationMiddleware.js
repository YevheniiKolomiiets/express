const Joi = require('joi');

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((e) => e.message).join(',');

      res.status(422).json({ message });
    }
  };
};

module.exports = validationMiddleware;
