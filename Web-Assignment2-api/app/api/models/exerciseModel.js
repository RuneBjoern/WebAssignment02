var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  workoutId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  },
  exercisename: {
    type: String,
    required: true,
    trim: true
  },
  exercisedescription: {
    type: String,
    trim: true
  },
  numberofsets: {
    type: Number,
    required: true,
  },
  numberofreps: {
    type: Number,
  },
  timeinseconds:{
    type: Number,
  }
});

var Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;