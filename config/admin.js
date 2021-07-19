var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL : "https://xingu-sales.firebaseio.com/",
    storageBucket : "xingu-sales.appspot.com"
});

module.exports = admin
