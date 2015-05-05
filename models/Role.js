/**
 * Created by George on 4/14/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new mongoose.Schema({
    rolename: { type: String, unique: false, lowercase: true },
    description: String
});

module.exports = mongoose.model('Role',roleSchema);
