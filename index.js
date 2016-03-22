var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var json = require('./shemaMail.json');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){

res.sendFile( __dirname  + '/views/index.html');

}) ;

app.post('/post.html', function(req, res) {
  
var entreprise = req.body.nomentreprise;
var email = req.body.email;
var message = req.body.message;

console.log('nom de l entreprise ' + entreprise);
console.log('email   ' + email);
console.log('message  ' + message);
json.properties.entreprise = entreprise;
json.properties.email = email;
json.properties.message = message;
fs.writeFile('newMail.json', JSON.stringify(json, null, 4), function(err){

console.log('File successfully written!');
res.sendFile( __dirname  + '/views/post.html');
});

});

app.listen('8080')
console.log('Server is coming\nGo to the link http://localhost:8080/');