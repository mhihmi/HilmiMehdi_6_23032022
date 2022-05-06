const passwordSchema = require('../models/Password');

// Validate against a password string
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400)
            .json({ error: `Password not strong enough : ${passwordSchema.validate('req.body.password', { list: true })}, 5 - 15 letters with 2 digits, 1 uppercase & lowercase letters` })
    }
};