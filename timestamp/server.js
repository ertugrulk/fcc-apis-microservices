// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:timestamp?", function (req, res) {
  let param = req.params["timestamp"];
  let date = new Date(); // default to today
  if (param) {
    if (!isNaN(param)) { // check if it's a timestamp
      date = new Date(+param);
    } else {
      date = new Date(param);
    }
  }
  if (date instanceof Date && isFinite(date)) {
    res.json(
      {
        "unix": date.valueOf(),
        "utc": date.toUTCString()
      }
    );
  } else {
    res.json(
      { "error": "Invalid Date" }
    )
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
