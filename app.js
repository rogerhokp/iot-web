'use strict';

let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let mongoSrvc = require('./mongo.srvc.js');



// parse application/json
app.use(bodyParser.json())
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Content-Type');
    next();
});


app.post('/dirt', (req, res, next) => {
    mongoSrvc.save('dirt', Object.assign({}, req.body, { created_at: new Date() }),
        () => {
            res.send('ok');
            next();
        });
});

app.get('/dirt', (req, res, next) => {
    const isHourly = req.query.hourly === 'true';
    mongoSrvc.find('dirt', Number(req.query.limit) || 100, { created_at: -1 }, isHourly, dirts => {
        res.send(dirts);
        next();
    })
});


app.post('/temperature', (req, res, next) => {
    mongoSrvc.save('temperature', Object.assign({}, req.body, { created_at: new Date() }),
        () => {
            res.send('ok');
            next();
        });
});

app.get('/temperature', (req, res, next) => {
    const isHourly = req.query.hourly === 'true';
    mongoSrvc.find('temperature', Number(req.query.limit) || 100, { created_at: -1 }, isHourly, temperatures => {
        res.send(temperatures);
        next();
    })
});

app.use(express.static('static'));

app.listen(
    process.env.NODE_PORT || '8080',
    process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    function() {
        console.log(
            `Example app listening on port ${process.env.NODE_PORT} !`);
    });
