const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var NamirniceSchema = new Schema({
    naziv_namirnice: {
        type: String,
        required: true,
        maxlength: 100
    },
    kalorije: {
        type: Number,
        require: true
    },
    proteini: {
        type: Number
    },
    ugljeni_hidrati: {
        type: Number
    },
    masti: {
        type: Number
    },
});


//Export model 
module.exports = mongoose.model('Namirnice', NamirniceSchema);