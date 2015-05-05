/**
 * Created by George on 4/14/2015.
 */

var Role = require('../models/Role');
exports.listallroles = function(req,res){

    res.render('roles/listroles',{
        title: 'Roles List'
    });

};

exports.postCreateRole =function(req,res,next){

    var role = new Role();
    //cli.email= req.body.email;
    role.rolename= req.body.rolename;
    role.description = req.body.description;


    role.save(function(err)
        {  if(err){
            res.send(err);
        }
            req.toastr.info('New role successfully added');
            //req.flash('info',{msg:'New Client successfully added'});
            res.redirect('/roles/list');

        }

    );

};

exports.createRole = function(req,res){

    res.render('roles/create',
        {
            title:'Create New Role'

        });

};