const bcrypt = require('bcrypt');  // hash psw
const jwt = require('jsonwebtoken'); // secure data
const cryptojs = require('crypto-js'); // encrypt mail

const dotenv = require("dotenv");
dotenv.config();

const User = require('../models/User');

exports.signup = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_CRYPTO_KEY).toString();

    bcrypt.hash(req.body.password, 10) // hash request psw, salt hash number - method async
        .then(hash => {
            const user = new User({ // get hashed psw & save it in User Model instance for Database
                email: emailCryptoJs,
                password: hash
            });
            user.save() // save new user in Database
                .then(() => res.status(201).json({ message: 'User Created !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // Error 500 => server
};

exports.login = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.MAIL_CRYPTO_KEY).toString();

    User.findOne({ email: emailCryptoJs }) // Find User in DB with email sent in request, after encrypt
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found !' }); // 401 => Unauthorized
            }
            bcrypt.compare(req.body.password, user.password) // compare req psw with user hash psw in DB - Promise
                .then(valid => { // Return a Boolean
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({ // if true, Request Ok, object sent :
                        userId: user._id, // userId in DB
                        token: jwt.sign( // Encode token with jsw method sign()
                            { userId: user._id }, // Check userId Request - Payload
                            process.env.JWT_KEY, // Encode secret key - Salt
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // for connection issues, server error
};