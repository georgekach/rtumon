/**
 * Created by George on 3/18/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new mongoose.Schema({
    deviceId: { type: String, unique: false, lowercase: true },
    description: String,
    location: String,
    version: String,
    clientId:{type: Schema.Types.ObjectId, ref: 'Client'},
    previousreadingtime: String,
    latestreadingtime : String,
    latestreadingchannels : String,
    latestreadingstate1 : String,
    latestreadinglastValue1 : String,
    latestreadingstate2 : String,
    latestreadinglastValue2 : String,
    latestreadingstate3 : String,
    latestreadinglastValue3 : String,
    latestreadingstate4 : String,
    latestreadinglastValue4 : String,
    latestreadinggps : String

});

module.exports = mongoose.model('Device',deviceSchema);