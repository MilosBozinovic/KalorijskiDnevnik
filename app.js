const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const compass = require('compass');
const session = require('express-session');


const app = express();

//Podešavanje templetskog jezika
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Rute
app.use('/', require('./routes/index'));

//namestanje statične rute
app.use(express.static('./public'));
app.use(compass({ cwd: __dirname + 'public' }));


//Dodavanje parsera rutama
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Podešavanje mongoose konekcije 
const mongoDB = 'mongodb+srv://milos:milos@kalorijskidnevnik-ih6iq.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB greška u konekciji:'));

MongoClient.connect(mongoDB, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        // console.log('Nastala je greška', err);
    }
    console.log('Konektovano na bazu!');
    const collection = client.db("test").collection("devices");

    client.close();
});


//Error ispisivanje
app.use((req, res, next) => {
    res.render('error404');
    // res.status(404).send("Ne možemo da nađemo to!")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Nešto ne radi!')
})


//Osluškivanje na portu 5000 i logovanje u konzoli da je pokrenut server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));