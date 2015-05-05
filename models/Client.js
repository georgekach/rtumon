/**
 * Created by George on 3/12/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var clientSchema = new mongoose.Schema({
    email: { type: String, unique: false, lowercase: true },
    fname: String,
    sname: String,
    cellnumber: String,
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}],
    profile: {
        name: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        logo: { type: String, default: '' }
    },
    billingfrequency: Number,
    address: String,
    billingaddress: String,
    billingemail: String
});

module.exports = mongoose.model('Client',clientSchema);