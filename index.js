var express = require('express');
var multer  = require('multer');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(multer());
});

app.post('/parse', function (req, res) {
  var from = req.body.from;
  var text = req.body.text;
  var subject = req.body.subject;
  var num_attachments = req.body.attachments;
  for (i = 1; i <= num_attachments; i++){
    var attachment = req.files['attachment' + i];
    // attachment will be a File object
  }
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
