const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require("./routes");
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/', routes);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true })

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
