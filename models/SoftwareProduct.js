/**
 * Created by George on 4/2/2015.
 */
/**
 * Created by George on 3/12/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var spSchema = new mongoose.Schema({
    productname: { type: String, unique: false, lowercase: true },
    description: String,
    triallength: Number,
    versions: [{type: Schema.Types.ObjectId, ref: 'SoftwareProductVersion'}]
});

module.exports = mongoose.model('SoftwareProduct',spSchema);