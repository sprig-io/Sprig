const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const uri = 'mongodb://localhost:27017/Capstone';
const passport = require('passport');
const users = require('./routes/api/user');
const budget = require('./routes/api/budget');
const path = require('path');
const plaid = require('./routes/api/plaid');
const app = express();
if (process.env.NODE_ENV === 'development') require('./config/keys');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// static file-serving middleware
app.use(express.static(path.join(__dirname, 'public')));

// DB Config
const db = process.env.mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

app.use('/api/budget', budget);

app.use('/api/users', users);
app.use('/api/plaid', plaid);

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Getting spriggy with it on port ${port} !`)
);

module.exports = app;
