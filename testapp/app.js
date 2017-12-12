const express = require('express');
// const serve = require('express-static');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.post('/registration', (req, res) => { 
    console.log(req.body);
    res.send(req.body || "");
    // sendMail(res.data.email); 
}); 

app.listen(3000, function () {
    console.log('server is running');
});