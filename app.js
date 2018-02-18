const express   = require('express'),
    nodemailer  = require('nodemailer'),
    bodyParser  = require('body-parser'),
    flash       = require('connect-flash'),
    session     = require('express-session'),
    axios       = require('axios');

const app = express();

app.use(express.static('public'));
/* Flash messages are stored in the session. 
First, setup sessions by enabling session middleware. 
Then, use flash middleware provided by connect-flash */
app.use(session({
    secret: 'tom and joep', 
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); 

app.use(bodyParser.json());

app.post('/registration', (req, res) => { 
    
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('info', 'You have successfully subscribed to the Kubernetes Courses newsletter');
    console.log(req.body);

    var new_subscriber = {
        "email_address": req.body.email,
        "status": "subscribed",
            "merge_fields": {
            "WORKSHOP": req.body.workshop,
            "COURSE": req.body.course
        }
    };
    
    //send registration to mailchimp
    axios.post(`https://${env.USER}:${env.PASSWORD}@us17.api.mailchimp.com/3.0/lists/9e67587f52/members/`, new_subscriber);

    // Get an array of flash messages by passing the key to req.flash() 
    res.send( { messages: req.flash('info') }); 
    res.sendStatus(200);
});

app.listen(3000, function () {
    console.log('server is running');
});