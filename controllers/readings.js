/**
 * Created by George on 3/23/2015.
 */
var Readings =  require('../models/Reading');
var Device = require('../models/Device');


exports.listReadings = function(req, res) {



    Readings.find(function(err,readings){
        if(err)
            res.send(err);
        res.render('readings/listreadings', {
            title: 'Readings  Listing',
            readings:readings
        });
    });
};

exports.showGraphs = function (req, res) {
    res.render('readings/graph', {
        title: 'Graph'
    });
};

exports.captureReading = function(req,res){
  console.log(req.params.data);
};