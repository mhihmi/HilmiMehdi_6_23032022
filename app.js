const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// Import Path of File System
const path = require('path');
// Import Routes
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

// MongoDB Link
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection succeed !'))
    .catch(() => console.log('MongoDB connection failed !'));

const app = express();

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