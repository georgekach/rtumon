/**
 * Created by George on 3/18/2015.
 */
var Client = require('../models/Client');
var Device = require('../models/Device');
var Reading = require('../models/Reading');

exports.listDevices = function(req, res) {



    Device.find(function(err,devices){
        if(err)
            res.send(err);
        if(devices) {
            res.render('device/list', {
                title: 'Device Listing',
                devices: devices
            });
        }
        else
        {
            res.redirect('/');
            res.flash('error',{msg:'no devices to list'});

        }
    });
};

exports.viewDashboard = function(req, res) {


    res.render('device/dashboard', {
        title: 'Device Dashboard'

    });
}

exports.getDevice = function(req,res){

    var deviceId = req.params.id;

    Device.findById(deviceId,function(err,device){
        if(err)
        {res.send(err);}

        Client.findOne({'id':device.clientId},function(err2,client){

            if(err2)
                res.send(err2);
            Reading.find({'device':device.id},function(err3,readings){

                res.render("device/devicedetails",{
                    title: "Device Details",
                    client: client,
                    device: device,
                    readings:readings
                });
            });


        });
    });

};

exports.postDeviceDetailsUpdate = function(req,res,next){
    var deviceId =  req.params.id;
    Device.findById(deviceId,function(err,device) {
        if (err)res.send(err);
        if (device) {

            device.deviceId = req.body.deviceId || '';
            device.description = req.body.description || '';
            device.location = req.body.location || '';
            device.version = req.body.version || '';
            //client.email = req.body.email||'';

            device.save(function (err) {
                if (err) return next(err);
                res.redirect('/devices');
                req.flash('success', {msg: 'Device Info updated'});

            });
        }else
        {
            req.flash('error', {msg: 'error saving record'});
            //res.send('ssdfsd');
        }
    });
};

