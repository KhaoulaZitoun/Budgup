var cozydb = require('cozydb');


// Toutes les vues de la base de données à ajouter ici
module.exports = {
    client: {
        all: cozydb.defaultRequests.all,
        byCreditor: cozydb.defaultRequests.by('creditor')
    }
};