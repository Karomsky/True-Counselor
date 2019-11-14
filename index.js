var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
//var multer  = require('multer');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require("path");
var server = require('http').createServer(app);

//*****Webhook********//

app.post('/webhook', function (req, res) {
  console.log('Received a post request');
  if (!req.body) return res.sendStatus(400)
  res.setHeader('Content-Type', 'application/json');
  console.log('here is the post request from DialogFlow');
  console.log(req.body);
  console.log('Got verse parameter from DialogFlow '+req.body.queryResult.parameters['text'])
  
var book = req.body.queryResult.parameters['book'];
var chapter = req.body.queryResult.parameters['chapter'];
var verse = req.body.queryResult.parameters['verse'];
var searchStr = book+chapter+'.'+verse
var v getVerse(searchStr);
let response = ""; //Default response from the webhook to show it;s working
let responseObj = {
                "fulfillmentText":response
                ,"fulfillmentMessages":[{"text": {"text": [v]}}]
                ,"source":""
              }
console.log('Here is the response to dialogflow');
console.log(responseObj);
return res.json(responseObj);
  });

var apiKey ='78826d6495df5466375a19bc1a747a54'
var result

//***Call Back function
function cb (err, response, body) {
  if(err){
    console.log('error:' error);
  }
    var bibleverse = JSON.parse(body)
    if (bibleverse.message === 'searchStr not found)
        {
          result = 'Unable to get verse '+bibleverse.message;
        }
        else
        {
          result = 'Here is your verse - '+bibleverse.text;
        }
}

function getVerse(searchStr){
  result = undefined;
  var url = 'https://api.biblia.com/v1/bible/content/LEB.txt.js?passage=$(searchStr)&callback=cb&key=${apiKey};
  console.log(url);
  var req = request(url,cb);
  while(result===undefined){
    require('deasync').runLoopOnce();
    
  }
 return result;
  
}
