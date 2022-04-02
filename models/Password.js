const passwordValidator = require('password-validator');

// Schema creation
const passwordSchema = new passwordValidator();

// Add Schema properties
passwordSchema
    .is().min(5)                                    // Minimum length 5
    .is().max(15)                                   // Maximum length 15
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = passwordSchema;