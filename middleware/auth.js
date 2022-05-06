const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Select 2nd element, after "bearer".
        req.token = jwt.verify(token, process.env.JWT_KEY); // decode & verify token to get Payload.
        next();
    } catch (error) {
        res.status(401).json({ error: error | 'Unauthenticated Request !' });
    }
};