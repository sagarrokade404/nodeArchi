const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      http =require ('http'),
      path = require('path');
      
      global.__rootRequire = function (relpath) {
        return require(path.join(__dirname, relpath));
    };

    var app = express()

    app.use(cors({ origin: '*' }));
    app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}));
app.use(bodyParser.json({limit: '60mb', extended: true}));


process.env.NODE_ENV = process.env.NODE_ENV || 'local'; //local server

const config = require('./utlitys/config.js').get(process.env.NODE_ENV);
console.log(`using ${process.env.NODE_ENV} server`)
require('./utlitys/db');


app.use(express.static(path.join(__dirname, 'public/dist/frontend')));
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

app.use('/api', require('./modules/router')(express));
var port = process.env.PORT || 3000;

var server = http.createServer(app).listen(port, () => {
    console.log(`http server started at port ${port}`)
})