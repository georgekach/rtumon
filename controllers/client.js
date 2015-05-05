/**
 * Created by George on 3/12/2015.
 */
var Client = require('../models/Client');
var Device = require('../models/Device');
var Reading = require('../models/Reading');
/**
 * GET /account
 * Profile page.
 */
exports.listClients = function(req, res) {



    Client.find(function(err,clients){
        if(err)
        res.send(err);
        res.render('client/list', {
            title: 'Client Listing',
            clients:clients
        });
    });
};

exports.createClient = function(req,res){
   res.render('client/create',{

       title: 'New Client'

   } );

};

exports.postCreateClient =function(req,res,next){

     var cli = new Client();
    //cli.email= req.body.email;
     cli.fname= req.body.fname;
       cli.sname = req.body.sname;
      // cli.logo ='fmfmfsmms';

       cli.save(function(err)
          {  if(err){
              res.send(err);
          }
              req.toastr.info('New Client successfully added');
              //req.flash('info',{msg:'New Client successfully added'});
          res.redirect('/clients');

           }

      );

};
exports.getClient = function(req,res){

    var clientId = req.params.id;





    Client.findById(clientId,function(err,client){
       if(err)
       {res.send(err);}

        Device.find({'clientId':client.id},function(err2,devices){

            if(err2)
            res.send(err2);

            res.render("client/clientdetails",{
                title: "Client Details",
                client: client,
                devices: devices
            });

        });
    });

};

exports.deleteClient=function(req,res){
    var clientId = req.params.id;

    Client.findById(clientId,function(err,client){
        if(err)
        res.send(err);

        res.render('client/delete',{
            title:'Delete Client',
            client: client
        });

    });
};

exports.postDeleteClient = function(req,res,next){
    var clientId =  req.params.id;
    Client.findById(clientId,function(err,myclient)
    {
        if(err)
        res.send(err);
        myclient.remove();
    });
    req.flash('info',{msg:' Successfully deleted client'});
    res.redirect('/clients');

};
exports.postClientDetailsUpdate = function(req,res,next){
    var clientId =  req.params.id;
    Client.findById(clientId,function(err,client) {
        if (err)res.send(err);
        if (client) {

        client.fname = req.body.fname || '';
        client.sname = req.body.sname || '';
        //client.email = req.body.email||'';

        client.save(function (err) {
            if (err) return next(err);
            res.redirect('/clients');
            req.flash('success', {msg: 'Client Info updated'});

        });
    }else
        {
            req.flash('error', {msg: 'error saving record'});
            //res.send('ssdfsd');
        }
    });
};

exports.createClientDevice = function(req,res){
  var id = req.params.clientId;
    Client.findById(id,function(err,client){
        if(err)
        res.send(err);

        res.render('device/create',{
            title:'create New Device',
            client: client
        });
    });

};

exports.postCreateClientDevice = function(req,res,next){
    Client.findById(req.params.clientId,function(err,client){
        if(err)
        res.send(err);

        var device = new Device();
        device.deviceId = req.body.deviceId;
            device.description = req.body.description;
            device.location= req.body.location;
            device.version= req.body.version;
            device.clientId=client.id;
            device.latestreadingtime = '';
            device.latestreadingchannels = '';
            device.latestreadingstate1 ='';
            decive.latestreadinglastValue1 ='';
            decive.latestreadingstate2 ='';
            decive.latestreadinglastValue2 ='';
            decive.latestreadingstate3 ='';
            decive.latestreadinglastValue3 ='';
            decive.latestreadingstate4 ='';
            decive.latestreadinglastValue4 ='';
            device.latestreadinggps = '';

        device.save(function(err){
            if(err)
            {next(err);}

        });

        client.devices.push(
            device.id
        );

        client.save(function(err){
            if(err)
            next(err);
        });

        res.redirect('/client/edit/'+client.id);
        req.flash('info', {msg: 'added a device to client'});
    })
}