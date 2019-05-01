const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const uri = 'mongodb://localhost:27017/Capstone';

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use('/api', require('./routes/api/user'));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Getting spriggy with it on port ${port} !`)
);
