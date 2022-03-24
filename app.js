const express = require('express');

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

// MongoDB Link
mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@hottakesdb.6lhhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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
app.use(express.json());  //aka body-parser()

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Object created !'
    });
});

app.get('/api/sauces', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeomoihi',
            name: 'Sauce Samouraï',
            manufacturer: 'Amora',
            description: 'Une sauce pour les guerriers !',
            imageUrl: 'https://m.media-amazon.com/images/I/71OkYn23uhL._AC_SX522_.jpg',
            heat: '7',
            likes: '252',
            dislikes: '8',
            usersLiked: ["String <userId>"],
            usersDisliked: ["String <userId>"]
        },
    ];
    res.status(200).json(stuff);
});

module.exports = app;