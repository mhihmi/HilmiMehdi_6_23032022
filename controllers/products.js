// Sauce Model Import
const Sauce = require('../models/Sauces');
// Import fs package de Node => file system
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // multer format changed req => extract Json Object from sauce
    delete sauceObject._id; // delete id key from body
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.token.userId, // get token userId  
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // generate dynamic imgUrl
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce saved successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId !== req.token.userId) { // Compare UserId de la bdd et celui du token (cf.req précédente)
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                })
            }
            const sauceObject = req.file ? // multer, is any file/img added ?
                {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // Find Sauce by Id in DB
        .then((sauce) => {
            if (!sauce) { // If no sauce
                return res.status(404).json({
                    error: new Error('Sauce not found !')
                });
            }
            if (sauce.userId !== req.token.userId) { // If DB UserId & token userId (cf. auth.js) different 
                return res.status(401).json({
                    error: new Error('Request forbidden !')
                })
            }
            // if DB UserId & token userId are the same, we can delete it
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce Deleted !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};