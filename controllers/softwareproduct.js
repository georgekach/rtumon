/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 4/14/2015.
 */

var SoftwareProduct = require('../models/SoftwareProduct');
exports.listallSoftwareProducts = function(req,res){

    SoftwareProduct.find(function(err,softwareproducts){
        res.render('softwareproduct/list',{
            title: 'SoftwareProducts List',
            softwareproducts: softwareproducts
        });

    });


};

exports.postCreateSoftwareProduct =function(req,res,next){

    var softwareProduct = new SoftwareProduct();
    //cli.email= req.body.email;
    softwareProduct.productname= req.body.productname;
    softwareProduct.description = req.body.description;
    softwareProduct.triallength= req.body.triallength;
    //softwareProduct.description = req.body.description;

    softwareProduct.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {

                //req.toastr.info('New SoftwareProduct successfully added');
                req.flash('info', {msg: 'New SoftwareProduct successfully added'});
                //res.render('SoftwareProducts/list',{req:req});

                res.redirect('/softwareproduct/list');
            }


        }

    );

};

exports.createSoftwareProduct = function(req,res){

    res.render('softwareproduct/create',
        {
            title:'Create New SoftwareProduct'

        });

};
exports.editSoftwareProduct = function(req,res){
    var accessRightId = req.params.id;
    SoftwareProduct.findById(accessRightId,function(err,softwareProduct){
        if(err)
            res.send(err);
        else{

            if(softwareProduct)
            {
                res.render('softwareproduct/edit',{
                    title: 'Edit SoftwareProduct',
                    softwareProduct: softwareProduct
                });
            }else{

            }
        }

    });
};

exports.postEditSoftwareProduct = function(req,res,next){
    var softwareproductid = req.params.id;
    SoftwareProduct.findById(softwareproductid,function(err,softwareProduct){

        if(err)
            res.send(err);

        if(softwareProduct){
            softwareProduct.productname = req.body.productname;
            softwareProduct.description = req.body.description;
            softwareProduct.triallength= req.body.triallength;

            softwareProduct.save(function(err){
                if(err)
                {
                    res.send(err);
                }
                else{
                    res.redirect('/softwareproduct/list');
                }

            });
        }

    })
}