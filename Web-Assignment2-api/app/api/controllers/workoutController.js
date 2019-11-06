const workoutModel = require('../models/workoutModel');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		workoutModel.findById(req.params.Id, function(err, workoutInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Workout found", data:{workouts: workoutInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let workoutList = [];

		workoutModel.find({}, function(err, workouts){
			if (err){
				next(err);
			} else{
				for (let workout of workouts) {
					workoutList.push({id: workout._id, workoutname: workout.workoutname, ownerId: workout.ownerId});
				}
				res.json({status:"success", message: "All workouts list", data:{workouts: workoutList}});
							
			}

		});
	},

    getByOwnerId: function(req, res, next) {
		let workoutList = [];

		workoutModel.find({ownerId: req.body.ownerId}, function(err, workouts){
			if (err){
				next(err);
			} else{
				for (let workout of workouts) {
					workoutsList.push({id: workout._id, workoutname: workout.workoutname, ownerId: workout.ownerId});
				}
				res.json({status:"success", message: "Workout list", data:{workouts: workoutList}});
							
			}

		});
    },
    
	updateById: function(req, res, next) {
		workoutModel.findByIdAndUpdate(req.params.Id,{workoutname: workout.workoutname}, function(err, workoutInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Workout updated", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		workoutModel.findByIdAndRemove(req.params.id, function(err, workoutInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Workout deleted", data:null});
			}
		});
	},

	create: function(req, res, next) {
		workoutModel.create({ workoutname: workout.workoutname, ownerId: workout.ownerId }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Workout added", data: null});
				  
				});
	},

}					