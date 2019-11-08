
const exerciseModel = require('../models/exerciseModel');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		exerciseModel.findById(req.params.exerciseId, function(err, exercise){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Exercise found", data:{exercises: exercise}});
			}
		});
	},

	getByWorkoutId: function(req, res, next) {
		let exerciseList = [];

		exerciseModel.find({workoutId: req.params.workoutId}, function(err, exercises){
			if (err){
				next(err);
			} else{
				for (let exercise of exercises) {
					exerciseList.push({id: exercise._id, workoutId: exercise.workoutId, exercisename: exercise.exercisename,
						exercisedescription: exercise.exercisedescription, numberofsets: exercise.numberofsets, numberofreps: exercise.numberofreps});
				}
				res.json({status:"success", message: "Exercises found", data:{exercises: exerciseList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		exerciseModel.findByIdAndUpdate(req.params.Id,{exercisename:req.body.exercisename, exercisedescription:req.body.exercisedescription, 
				numberofsets:req.body.numberofsets, numberofreps:req.body.numberofreps}, function(err, movieInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Exercise updated", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		exerciseModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Exercise deleted", data:null});
			}
		});
	},

	create: function(req, res, next) {
		exerciseModel.create({workoutId: req.body.workoutId, exercisename:req.body.exercisename, exercisedescription:req.body.exercisedescription, 
			numberofsets:req.body.numberofsets, numberofreps:req.body.numberofreps}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Exercise added", data: result});
				  
				});
	},

}					