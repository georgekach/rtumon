/**
 * Created by George on 5/6/2015.
 */
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Schema = mongoose.Schema


var accessRightSchema = new mongoose.Schema({
    key: { type: String, unique: false, lowercase: true },
    name: String,
    description: String
});

module.exports = mongoose.model('AccessRight',accessRightSchema);