/**
 * Created by George on 4/14/2015.
 */

var Role = require('../models/Role');
exports.listallroles = function(req,res){

    Role.find(function(err,roles){
        res.render('roles/listroles',{
            title: 'Roles List',
            roles: roles
        });

    });


};

exports.postCreateRole =function(req,res,next){

    var role = new Role();
    //cli.email= req.body.email;
    role.rolename= req.body.rolename;
    role.description = req.body.description;


    role.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {
                //req.toastr.info('New role successfully added');
                req.flash('info', {msg: 'New Client successfully added'});
                //res.render('roles/list',{req:req});

                res.redirect('/roles/list');
            }
        }

    );

};

exports.createRole = function(req,res){

    res.render('roles/create',
        {
            title:'Create New Role'

        });

};
exports.editrole = function(req,res){
    var roleId = req.params.id;
    Role.findById(roleId,function(err,role){
       if(err)
       res.send(err);

        if(role)
        {
            res.render('roles/edit',{
                title: 'Edit Role',
                role: role
            });
        }else{

        }
    });
};

exports.postEditRole = function(req,res,next){
    var roleid = req.params.id;
    Role.findById(roleid,function(err,role){

        if(err)
        res.send(err);
        else {
            if (role) {
                role.rolename = req.body.rolename;
                role.description = req.body.description;

                role.save(function (err) {
                    if (err) {
                        res.send(err);
                    }else{

                        res.redirect('/roles/list');
                    }

                });
            }
        }

    })
}