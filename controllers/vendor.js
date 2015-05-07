/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 4/14/2015.
 */

var Vendor = require('../models/Vendor');
exports.listallVendors = function(req,res){

    Vendor.find(function(err,vendors){
        res.render('vendor/list',{
            title: 'Vendors List',
            vendors: vendors
        });

    });


};

exports.postCreateVendor =function(req,res,next){

    var vendor = new Vendor();
    //cli.email= req.body.email;
    vendor.billingaddress= req.body.billingaddress;
    vendor.notes = req.body.notes;
    vendor.companyname = req.body.companyname;
    vendor.billingfrequency = req.body.billingfrequency;
    vendor.address = req.body.address;
    vendor.billingemail = req.body.billingemail;
    vendor.vendorname = req.body.vendorname;

    vendor.save(function(err)
        {  if(err){
            res.send(err);
            //req.flash(err.message);
        }
            else{
            //req.toastr.info('New Vendor successfully added');
            req.flash('info',{msg:'New Vendor successfully added'});
            //res.render('Vendors/list',{req:req});

            res.redirect('/vendor/list');
        }


        }

    );

};

exports.createVendor = function(req,res){

    res.render('vendor/create',
        {
            title:'Create New Vendor'

        });

};
exports.editVendor = function(req,res){
    var vendorId = req.params.id;
    Vendor.findById(vendorId,function(err,vendor){
        if(err)
            res.send(err);

        if(vendor)
        {
            res.render('vendor/edit',{
                title: 'Edit Vendor',
                vendor: vendor
            });
        }else{

        }
    });
};

exports.postEditVendor = function(req,res,next){
    var vendorid = req.params.id;
    Vendor.findById(vendorid,function(err,vendor){

        if(err)
            res.send(err);
        else {

            if (vendor) {
                vendor.billingaddress = req.body.billingaddress;
                vendor.notes = req.body.notes;
                vendor.companyname = req.body.companyname;
                vendor.billingfrequency = req.body.billingfrequency;
                vendor.address = req.body.address;
                vendor.billingemail = req.body.billingemail;
                vendor.vendorname = req.body.vendorname;

                vendor.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.redirect('/vendor/list');
                    }

                });

            }

        }

    });
};
