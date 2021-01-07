require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

function isValidURL(s) {
  try {
    let url = new URL(s);
    return url.protocol == "http:" || url.protocol == "https:";
  } catch (err) {
    return false;
  }
}

var urls = []
app.post("/api/shorturl/new", function(req, res) {
  if(!isValidURL(req.body.url)){
    res.json({ error: 'invalid url' });
  } else {
    let id = urls.push(req.body.url);
    res.json({
      original_url: req.body.url,
      short_url: id
    });
  }
});

app.get("/api/shorturl/:url", function(req, res) {
  let url = urls[parseInt(req.params.url) - 1];
  if(url){
  res.redirect(url);
  } else { 
    res.sendStatus(404);
  }
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
