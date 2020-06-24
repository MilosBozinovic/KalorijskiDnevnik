const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

//Modeli 
const Namirnice = require("../models/namirnice");


const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res) {
    res.render('dnevnik');

});

router.get('/dnevnik', function(req, res) {
    res.render('dnevnik');

});

router.post('/dnevnik', function(req, res) {

});


/* kalkulator strana */

router.get('/kalkulator', function(req, res) {
    res.render('kalkulator');
});

router.post('/kalkulator', urlencodedParser, function(req, res) {


});


router.get('/namirnice', function(req, res) {
    Namirnice.find({}, function(err, namirnice) {
        if (err) {
            console.log(err);
        } else {
            res.render('namirnice', { data: namirnice });
        }
    });
});

router.post('/namirnice', urlencodedParser, function(req, res) {
    let namirnice = new Namirnice();
    namirnice.naziv_namirnice = req.body.naziv_namirnice;
    namirnice.kalorije = req.body.kalorije;
    namirnice.proteini = req.body.proteini;
    namirnice.ugljeni_hidrati = req.body.ugljeni_hidrati;
    namirnice.masti = req.body.masti;

    namirnice.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('namirnice');
        }
    });
});



module.exports = router