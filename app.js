const express = require('express');
// const serve = require('express-static');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

function sendMail(email) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASSWORD  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '', // sender address
        to: email, // list of receivers
        subject: 'Thank you for registration', // Subject line
        text: 'Thank you', // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

app.use(bodyParser.json());
app.post('/registration', (req, res) => { 
    console.log(req.body);
    res.send(req.body || "");
    // sendMail(res.data.email); 
}); 

app.listen(3000, function () {
    console.log('server is running');
});