/**
 * Created by George on 4/2/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var spkSchema = new mongoose.Schema({
    name: { type: String, unique: false, lowercase: true },
    issuedate: String,
    expirydate: String,
    product:{type: Schema.Types.ObjectId, ref: 'SoftwareProduct'},
    productversion:{type: Schema.Types.ObjectId, ref: 'SoftwareProductVersion'},
    client:{type: Schema.Types.ObjectId, ref: 'Client'}

});

module.exports = mongoose.model('SoftwareProductKey',spkSchema);