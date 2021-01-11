const express = require('express');
const app = express();
const cors = require('cors');
const uuid = require('uuid');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

var users = []

app.post('/api/exercise/new-user', (req, res) => {
  let userIndex = users.findIndex(user => user.username == req.body.username);
  if (userIndex >= 0){
    res.send("Username already taken");
    return;
  }
  let id = uuid.v1();
  let user = {_id: id, username: req.body.username, log: []}
  users.push(user);
  res.json(user);
});

app.get('/api/exercise/users', (req, res) => {
  let result = users.map(user => ({_id: user._id, username: user.username}));
  res.json(result);
});

app.post('/api/exercise/add', (req, res) => {
  let userIndex = users.findIndex(user => user._id == req.body.userId);
  if (userIndex < 0) {
    res.sendStatus(404);
    return;
  }
  let log = {
    date: Date(req.body.date) ?? new Date(),
    description: req.body.description,
    duration: req.body.duration
  };
  users[userIndex].log.push(log);
  res.sendStatus(200);
});

app.get('/api/exercise/log', (req, res) => {
  let userIndex = users.findIndex(user => user._id == req.query.userId);
  if (userIndex < 0) {
    res.sendStatus(404);
    return;
  }
  let user = users[userIndex];
  let logs = user.log; // TODO: Filter: from, to, limit
  let result = {
    _id: user._id,
    username: user.username,
    count: log.length,
    log: user.log
  };
  res.json(result);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
