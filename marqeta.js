const env = require('./env');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.json());

app.all('/*', (req, res) => {
    let uri = env.endpoint + req.path();

    request(uri, {
        headers: req.headers,
        body: req.body,
        method: req.method,
        json: true
    }, (error, response) => {
        if (!error) {
            res.send(response);
        } else {
            res.send({
                success: false,
                message: [{
                    "code": "001",
                    "message": "There was an error while calling the Marqeta service"
                }]
            })
        }
    });
});

app.listen(env.port, () => {
    console.log(`Marqeta web service listening on port ${env.port}`);
});