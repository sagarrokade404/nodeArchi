'use strict';
var mongoose = require('mongoose');

//All models schema
__rootRequire("modules/controlers/user/model/user_model");


const config = require('./config.js').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, { user: config.db.user, pass: config.db.password ,useNewUrlParser: true });//SDN Local server
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function () {
	console.log("Database conencted successfully!");
});
// mongoose.set('debug', true);




