const express   = require('express'),
    nodemailer  = require('nodemailer'),
    bodyParser  = require('body-parser'),
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

function sendMail(formData) {
    //console.log(`login used to send email: ${process.env.USER}`);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.USER,// generated ethereal user
            pass: process.env.PASSWORD// generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: process.env.FROMEMAIL, // sender address
        to: process.env.MAINEMAIL, // list of receivers
        subject: 'A new user registered for Kubernetes courses newsletter', // Subject line
        text: `You have got one new subscriber with e-mail address: \n
              ${formData.email} \n
              This subscriber has chosen:  \n
              WORKSHOP: ${formData.workshop} \n
              VIDEO: ${formData.video}`// plain text body
    };

    // setup email data to the nw userwith unicode symbols
    let mailOptions2 = {
        from: process.env.FROMEMAIL, // sender address
        to: formData.email, // list of receivers
        subject: 'Welcome to the Kubernetes Courses Newsletter', // Subject line
        text: 'Thank you for subscribing for the Kubernetes Courses Newsletter :)  ', 
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
    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

app.use(bodyParser.json());

app.post('/registration', (req, res) => { 
    console.log(req.body);
    sendMail(req.body);
    saveEmail(req.body);     
    res.send({ success: "true" }); 
    
});

app.listen(3000, function () {
    console.log('server is running');
});