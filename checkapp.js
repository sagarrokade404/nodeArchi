'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/swagger/swagger.json');
var cors = require('cors');
var fs = require('fs');
var http = require('http');
var https = require('https');
var notifCrl;
const fileUpload = require('express-fileupload');
global.__rootRequire = function (relpath) {
    return require(path.join(__dirname, relpath));
};

// C:\Program Files\MongoDB\Server\4.2\data\

var app = express();
app.use(cors());

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

process.env.NODE_ENV = process.env.NODE_ENV || 'local'; //local server

const config = require('./app/config/config.js').get(process.env.NODE_ENV);
console.log(`using ${process.env.NODE_ENV} server`)
require('./app/config/db');

var utils = require('./app/lib/util')

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ limit: '60mb', extended: true }));
app.use(bodyParser.json({ limit: '60mb', extended: true }));

//cors for allow url from different ports
app.use(cors({ origin: '*' }));

app.use('/images', express.static(path.join(__dirname, './uploads/profile')));

app.use(fileUpload());
//connection with front-end
app.use('/uploads', express.static(path.join(__dirname, './app/uploads')));
app.use(express.static('public/dist/projectname'));



// routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/modules/dashboard')));
// All api requests
app.use(function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/api/v1', require('./app/api/v1/routes')(express));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'htmlpath'));
// });


// start server local
var port = process.env.PORT || config.port;
    var server = http.createServer(app).listen(port, () => {
    console.log('Available for staging:',port);

    console.log("Available on:", config.backendBaseUrl)

});
// end server local


// //     /* With SSL start */

// //  const httpsOptions = {
// //     key: fs.readFileSync('/finame.key', 'utf8'),
// //     cert: fs.readFileSync('finame', 'utf8')
// //     }


// const httpsOptions = {
//     key: fs.readFileSync('/root/SSL/server.key', 'utf8'),
//     cert: fs.readFileSync('/root/SSL/server.crt', 'utf8')
// }


// var port = process.env.PORT || config.port;
// var server = https.createServer(httpsOptions, app).listen(port, () => {

// });

// //     /* With SSL end */


