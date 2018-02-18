const express   = require('express'),
    nodemailer  = require('nodemailer'),
    bodyParser  = require('body-parser'),
    axios       = require('axios');

    const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/registration', (req, res) => { 
    
    var new_subscriber = {
        "email_address": req.body.email,
        "status": "pending",
        "merge_fields": {
            "WORKSHOP": req.body.workshop.toString(),
            "COURSE": req.body.course.toString()
        }
    };

    console.log(`New user wants to subscribe ${req.body.email}`);

    var url = `https://${process.env.USER}:${process.env.PASSWORD}@us17.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/`;

    //send registration to mailchimp
    axios.post(url, new_subscriber)
    .then(function(success) {
        console.log(`Subscribed email ${req.body.email}`);
        res.sendStatus(200);
    },
    function(failure){
        console.log(`Failed registering user: ${failure}`);
        res.sendStatus(500);
    });
});

app.listen(3000, function () {
    console.log('server is running');
});