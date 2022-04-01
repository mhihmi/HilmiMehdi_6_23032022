const passwordValidator = require('password-validator');

// Schema creation
const passwordSchema = new passwordValidator();

// Add Schema properties
passwordSchema
    .is().min(5)                                    // Minimum length 10
    .is().max(15)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Validate against a password string
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400)
            .json({ error: `Password not strong enough : ${passwordSchema.validate('req.body.password', { list: true })}` })
    }
};