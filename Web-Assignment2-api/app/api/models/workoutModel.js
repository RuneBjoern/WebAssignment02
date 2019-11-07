const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
    ownerId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workoutname: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  });
  
  var Workout = mongoose.model('Workout', WorkoutSchema);
  module.exports = Workout
  