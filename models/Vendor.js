/**
 * Created by George on 5/7/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var vendorSchema = new mongoose.Schema({
    vendorname: { type: String, unique: false, lowercase: true },
    notes: String,
    companyname: String,
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

module.exports = mongoose.model('Vendor',vendorSchema);