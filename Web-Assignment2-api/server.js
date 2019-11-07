const express = require('express');
const logger = require('morgan');
const exerciseNoVal = require('./routes/exerciseNoVal') ;
const workoutNoVal = require('./routes/workoutNoVal') ;
const exerciseVal = require('./routes/exerciseVal') ;
const workoutVal = require('./routes/workoutVal') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));


// public
app.use('/users', users);
app.use('/exercises', exerciseNoVal);
app.use('/workouts', workoutNoVal);

// private
app.use('/exercises', validateUser, exerciseVal);
app.use('/workouts', validateUser, workoutVal);


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Error"});

});

app.listen(5000, function(){
	console.log('Node server listening on port 5000');
});
