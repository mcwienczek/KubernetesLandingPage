const express   = require('express'),
    nodemailer  = require('nodemailer'),
    bodyParser  = require('body-parser'),
    axios       = require('axios');
    fs          = require('fs');

    const app = express();

app.use(express.static('public'));

//function saving a newly signed email to the file emails.csv
function saveEmail(dataToWrite) {
    fs.appendFile('emails.csv', `${dataToWrite.email},${dataToWrite.workshop},${dataToWrite.video}\n`, (err) => {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('The new email has been successfully appended to emails.csv!');
    }
  });
}

app.use(bodyParser.json());

app.post('/registration', (req, res) => { 
    console.log(req.body);

    var new_subscriber = {
        "email_address": req.body.email,
        "status": "subscribed",
            "merge_fields": {
            "WORKSHOP": req.body.workshop.toString(),
            "COURSE": req.body.course.toString()
        }
    };

    //send registration to mailchimp
    axios.post(`https://${process.env.USER}:${process.env.PASSWORD}@us17.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/`, new_subscriber)
    .then(function(success) {
        console.log(`Subscribed email ${req.body.email}`);
        res.send( { messages: req.flash('info') }); 
    },
    function(failure){
        console.log(`Failed registering user: ${failure}`);
        res.sendStatus(500);
    });

    // Get an array of flash messages by passing the key to req.flash() 
    saveEmail(req.body);
    res.send({ success: "true" }); 
    
});

app.listen(3000, function () {
    console.log('server is running');
});