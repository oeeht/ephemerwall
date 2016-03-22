var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var app     = express();
var json = require('./shemaMail.json');


app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://ephemerwall%40gmail.com:ephemerwall123@smtp.gmail.com');


app.get('/', function(req, res){

res.sendFile( __dirname  + '/views/index.html');

}) ;

app.post('/post.html', function(req, res) {
  
var entreprise = req.body.nomentreprise;
var email = req.body.email;
var message = req.body.message;

// setup e-mail data with unicode symbols
var mailOptions = {
    from: entreprise + "<" + email + ">", // sender address
    to: 'ephemerwall@gmail.com', // list of receivers
    subject: 'Nouveau client: ' + email, // Subject line
    text: message, // plaintext body
    //html: message // html body
};

console.log('nom de l entreprise ' + entreprise);
console.log('email   ' + email);
console.log('message  ' + message);
json.properties.entreprise = entreprise;
json.properties.email = email;
json.properties.message = message;

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


fs.writeFile(entreprise +'.json', JSON.stringify(json, null, 4), function(err){

console.log('File successfully written!');
res.sendFile( __dirname  + '/views/post.html');
});

});


app.listen('8080')
console.log('Server is coming\nGo to the link http://localhost:8080/');