/**
 * Created by George on 3/12/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var spvSchema = new mongoose.Schema({
    versioname: { type: String, unique: false, lowercase: true },
    description: String,
    volumelicense: String
});

module.exports = mongoose.model('SoftwareProductVersion',spvSchema);