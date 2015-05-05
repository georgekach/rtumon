/**
 * Created by George on 4/7/2015.
 */
var SoftwareProduct = require('../models/SoftwareProduct');
var SoftwareProductVersion = require('../models/SoftwareProductVersion');

exports.listProducts = function(req, res) {

    SoftwareProduct.find(function(err,products){
        if(err)
            res.send(err);
        res.render('licensing/productslist', {
            title: 'Products  Listing',
            products:products
        });
    });
};

exports.licenseGenerator = function(req, res) {


        res.render('licensing/licensegenerator', {
            title: 'Product License Generator '
        });

};
exports.licenseNotifications = function(req, res) {


    res.render('licensing/notifications', {
        title: 'Product License Generator '
    });

};

exports.licenseExtensions = function(req, res) {
    res.render('licensing/extension', {
        title: 'Product License Extension '
    });

};