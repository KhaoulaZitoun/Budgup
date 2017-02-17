var express = require('express');
var router = express.Router();
var path = require('path');
var Client = require('../models/client');
var app = express();

// Main route of the application to test the HTTP API.

router.get('/', function(req, res, next) {
    res.status(200).sendFile('index.html');
});

/* ********************************************************** */
/*          ********* INSCRIPTION ********                    */
/* ********************************************************** */


// Affiche la page d'inscription
router.get('/inscription', function(req, res) {
 res.status(200).sendFile(path.resolve('client/inscription.html'));
 });


// Valide les informations du formulaire d'inscription
router.post('/inscription', function(req, res,next) {
    Client.create(req.body, function(err, client) {
        if(err) {
           next(err);
        } else {
            // Si tout va bien
            res.status(201).send(client);
        }
    });
});



/* ********************************************************** */
/*          ********* CONNEXION ********                    */
/* ********************************************************** */

// Affiche la page de connexion
router.get('/connexion', function(req, res) {
    res.status(200).sendFile(path.resolve('client/connexion.html'));
});

router.post('/connexion', function(req, res, next) {
    /*
     `Debt.request` also has an `options` parameter where you can specify
     things, like a specific key.
     */
    var options =  {
        emailkey: req.param.email,
        passwordkey: req.param.motdepasse
    };

    Client.request('byCreditor', options, function(err, client) {
        if(err) {
            next(err);
        } else if(client != null){
            res.redirect('/accueil');

        }else{

            res.status(500);

            }

    });
});





router.get('/clients', function(req, res, next) {

    Client.request('all', function(err, clients) {
        if(err) {
            next(err);
        } else {
            res.status(200).json(clients);
        }
    });
});





// Export the router instance to make it available from other files.
module.exports = router;

