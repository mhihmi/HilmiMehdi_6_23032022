const mongoose = require('mongoose');

// Adding validator plugin
const uniqueValidator = require('mongoose-unique-validator');

// User Schema - unique mail
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Using Validator with plugin method on Schema before creating a model
userSchema.plugin(uniqueValidator);

// Export du schéma utilisateur
module.exports = mongoose.model('User', userSchema);