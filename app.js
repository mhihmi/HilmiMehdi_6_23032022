const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// Import File System Path 
const path = require('path');
// Import Helmet for headers security
const helmet = require("helmet");
// Import mongo-sanitize to protect from injections
const mongoSanitize = require('express-mongo-sanitize');
// Import express-rate-limit to protect from force brute attacks
const rateLimit = require('express-rate-limit');
// Import Logger
const morgan = require('morgan');
// Import Routes
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

// Setup rate-limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.set('debug', true);  // Mongoose debugger
// MongoDB Link
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection succeed !'))
    .catch(() => console.log('MongoDB connection failed !'));

const app = express();

// Security plugin call
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Middleware to secure HTTP Headers
app.disable('x-powered-by'); // Disable headers 'x-powered-by'
app.use(mongoSanitize()); // Global Middleware to protect from Injections
app.use(limiter); // Middleware to protect from brute force attacks

app.use(morgan('dev'));

// Middleware for CORS security
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Origin is ALL (*)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Headers Authorization
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Methods Authorization
    next();
});

// Middleware : intercept Post request Json & put it in req Object (req, in req.body)
app.use(express.json());  // aka body-parser()

// Multer => Serv Images folder on request for : /images 
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use Routes of productRoutes for : /api/sauces
app.use('/api/sauces', productsRoutes);
//  Use Routes of userRoutes for : /api/auth
app.use('/api/auth', userRoutes);

module.exports = app;