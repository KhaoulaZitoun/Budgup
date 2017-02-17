// Definition of the document type and basic operations on debts.
var cozydb = require('cozydb');

var Client = cozydb.getModel('Client', {

    'nom': {
        type: String
    },

    'prenom': {
        type: String
    },

    'email': {
        type: String
    },

    'motdepasse': {
        type: String
    }
});


// Make this model available from other files.
module.exports = Client;