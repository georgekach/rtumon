/**
 * Created by George on 5/7/2015.
 */
/**
 * Created by George on 4/14/2015.
 */

var AccessRight = require('../models/AccessRight');
exports.listallAccessRights = function(req,res){

    AccessRight.find(function(err,accessRights){
        res.render('accessrights/list',{
            title: 'AccessRights List',
            accessRights: accessRights
        });

    });


};

exports.postCreateAccessRight =function(req,res,next){

    var accessRight = new AccessRight();
    //cli.email= req.body.email;
    accessRight.key= req.body.key;
    accessRight.description = req.body.description;
    accessRight.name = req.body.name;

    accessRight.save(function(err)
        {  if(err){
            res.send(err);
        }
            //req.toastr.info('New AccessRight successfully added');
            req.flash('info',{msg:'New Client successfully added'});
            //res.render('AccessRights/list',{req:req});

            res.redirect('/accessright/list');

        }

    );

};

exports.createAccessRight = function(req,res){

    res.render('accessRights/create',
        {
            title:'Create New AccessRight'

        });

};
exports.editAccessRight = function(req,res){
    var accessRightId = req.params.id;
    AccessRight.findById(accessRightId,function(err,accessRight){
        if(err)
            res.send(err);

        if(accessRight)
        {
            res.render('accessRights/edit',{
                title: 'Edit AccessRight',
                accessRight: accessRight
            });
        }else{

        }
    });
};

exports.postEditAccessRight = function(req,res,next){
    var accessRightid = req.params.id;
    AccessRight.findById(accessRightid,function(err,accessRight){

        if(err)
            res.send(err);

        if(accessRight){
            accessRight.key = req.body.key;
            accessRight.description = req.body.description;
            accessRight.name = req.body.name;

            accessRight.save(function(err){
                if(err)
                {
                    res.send(err);
                }
                res.redirect('/accessright/list');
            });
        }

    });
};