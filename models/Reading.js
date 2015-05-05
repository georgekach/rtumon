/**
 * Created by George on 3/23/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var readingSchema = new mongoose.Schema({

    unitId : String,
    type : String,
    time : String,
    channels : String,
    state1 : String,
    lastValue1 : String,
    state2 : String,
    lastValue2 : String,
    state3 : String,
    lastValue3 : String,
    state4 : String,
    lastValue4 : String,
    gps : String,
    device:{type: Schema.Types.ObjectId, ref: 'Device'}

});

module.exports = mongoose.model('Reading',readingSchema);