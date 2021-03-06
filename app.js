/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var multer  = require('multer');

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');
var toastr = require('express-toastr');
/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');
var deviceController = require('./controllers/device');
var readingsController = require('./controllers/readings');
var licensingController = require('./controllers/licensing')
var sysAdminController = require('./controllers/sysadmin');
var rolesController = require('./controllers/role');
var accessRightsController = require('./controllers/accessright');
var softwareProductsController = require('./controllers/softwareproduct');
var vendorController = require('./controllers/Vendor');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, 'uploads') }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(toastr());


app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});


/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/clients', clientController.listClients);
app.get('/client/edit/:id',clientController.getClient);
app.post('/client/edit/:id',passportConf.isAuthenticated,clientController.postClientDetailsUpdate);
app.get('/client/create',clientController.createClient);
app.post('/client/create',passportConf.isAuthenticated,clientController.postCreateClient);
app.get('/device/create/:clientId',clientController.createClientDevice);
app.post('/device/create/:clientId',passportConf.isAuthenticated,clientController.postCreateClientDevice);
app.get('/devices', deviceController.listDevices);
app.get('/readings', readingsController.listReadings);
app.get('/graphs', readingsController.showGraphs);
app.get('/dashboard', deviceController.viewDashboard);
app.get('/device/edit/:id',deviceController.getDevice);
app.post('/device/edit/:id',passportConf.isAuthenticated,deviceController.postDeviceDetailsUpdate);
app.get('/products',licensingController.listProducts);
app.get('/licensegen',licensingController.licenseGenerator);
app.get('/licensing/notifications',licensingController.licenseNotifications);
app.get('/licensing/extension',licensingController.licenseExtensions);


app.get('/users/list',userController.usersList);
app.get('/user/edit/:id',userController.editUser);
app.post('/user/edit/:id',userController.postEditUser);

app.get('/roles/list',rolesController.listallroles);
app.get('/roles/edit/:id',rolesController.editrole);
app.post('/roles/edit/:id',rolesController.postEditRole);
app.get('/roles/create',rolesController.createRole);
app.post('/roles/create',rolesController.postCreateRole);

app.get('/accessright/list',accessRightsController.listallAccessRights);
app.get('/accessright/edit/:id',accessRightsController.editAccessRight);
app.post('/accessright/edit/:id',accessRightsController.postEditAccessRight);
app.get('/accessright/create',accessRightsController.createAccessRight);
app.post('/accessright/create',accessRightsController.postCreateAccessRight);

app.get('/vendor/list',vendorController.listallVendors);
app.get('/vendor/edit/:id',vendorController.editVendor);
app.post('/vendor/edit/:id',vendorController.postEditVendor);
app.get('/vendor/create',vendorController.createVendor);
app.post('/vendor/create',vendorController.postCreateVendor);

app.get('/softwareproduct/list',softwareProductsController.listallSoftwareProducts);
app.get('/softwareproduct/edit/:id',softwareProductsController.editSoftwareProduct);
app.post('/softwareproduct/edit/:id', passportConf.isAuthenticated,softwareProductsController.postEditSoftwareProduct);
app.get('/softwareproduct/create',softwareProductsController.createSoftwareProduct);
app.post('/softwareproduct/create', passportConf.isAuthenticated,softwareProductsController.postCreateSoftwareProduct);



app.post('/readings/create/:data',readingsController.captureReading);
app.get('/sysadmin/index',sysAdminController.index);
app.get('/client/delete/:id',clientController.deleteClient);
app.post('/client/delete/:id',passportConf.isAuthenticated,clientController.postDeleteClient);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/aviary', apiController.getAviary);
app.get('/api/steam', apiController.getSteam);
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
app.get('/api/clockwork', apiController.getClockwork);
app.post('/api/clockwork', apiController.postClockwork);
app.get('/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
app.get('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.postTwitter);
app.get('/api/venmo', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getVenmo);
app.post('/api/venmo', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.postVenmo);
app.get('/api/linkedin', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getLinkedin);
app.get('/api/instagram', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getInstagram);
app.get('/api/yahoo', apiController.getYahoo);
app.get('/api/ordrin', apiController.getOrdrin);
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
app.get('/api/lob', apiController.getLob);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * OAuth authorization routes. (API examples)
 */
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/foursquare');
});
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/tumblr');
});
app.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }));
app.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function(req, res) {
  res.redirect('/api/venmo');
});

/**
 * Error Handler.
 */
app.use(errorHandler());


/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

/**
 * Set up Socket.io
 */
var io = require('socket.io')(server);
io.on('connection', function(socket){
    console.info('Received a connection from '+socket.id);

    socket.on('pageReady',function(data){
        console.log('Identity is '+data);
    });

    socket.on('disconnect',function(){
        console.info('Client has disconnected');
    })
});





/**
 * This cronjob section for correcting the readings and assigning them to a device
 * @type {exports.CronJob}
 */
var CronJob = require('cron').CronJob;
var Readings =  require('./models/Reading');
var Device = require('./models/Device');

new CronJob('* * * * * *', function() {

    Readings.find({device: {'$exists':false}},function(err,readings){
        if(err){

            console.log('error here');
        }
        else
        {

            readings.forEach(function(item){

                Device.findOne({'deviceId':item.unitId},function(err2,device){
                    if(err2)
                    {
                        console.log('error finding the device');

                    }else{

                        item.device = device;
                        item.save(function(err3){
                            if(err3)
                            {
                                console.log('error saving the record');
                            }else{
                                console.log('saved the reading');
                            }
                        });
                        device.previousreadingtime = device.latestreadingtime;
                        device.latestreadingtime = item.time;
                        device.latestreadingchannels = item.channels;
                        device.latestreadingstate1 = item.state1;
                        device.latestreadinglastValue1 = item.lastValue1;
                        device.latestreadingstate2 = item.state2;
                        device.latestreadinglastValue2 = item.lastValue2;
                        device.latestreadingstate3 = item.state3;
                        device.latestreadinglastValue3 = item.lastValue3;
                        device.latestreadingstate4 = item.state4;
                        device.latestreadinglastValue4 = item.lastValue4;
                        device.latestreadinggps = item.gps;


                        io.sockets.emit('pushdata-'+device.deviceId, {readingtime:new Date().getTime(),readingvalue: item.lastValue1});
                        console.log(item.lastValue1);


                        device.save(function(err4){
                            if(err4){
                                console.log('Error Saving Devices latest Reading');
                            }

                            //socket.io to emit data here
                            var previousdatetime =Date.parse(device.previousreadingtime);
                            var currentdatetime = Date.parse(device.latestreadingtime);

                            //if(currentdatetime>previousdatetime)
                           // {

                                //var data = getRandomInt(0,100);


                            //}
                       });
                    }

                });
                console.log(item.time);

            });


        }





    });

    io.sockets.emit('pushdata', {readingtime:new Date().getTime(),readingvalue: getRandomInt(0,100)});
   // console.log(item.lastValue1);

}, null, true, 'America/Los_Angeles');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = app;
