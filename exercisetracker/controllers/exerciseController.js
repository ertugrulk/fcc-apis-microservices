const { query } = require("express");
const User = require("../models/user");
const Exercise = require("../models/excersize");

exports.post_exercise = function(req, res) {
  User.findOne( { _id: req.body.userId} , function (err, userQueryResult) {
        if(err){
            return next(err);
        }
        if(userQueryResult) {
          let date = req.body.date == "" || req.body.date == undefined ? new Date() : new Date(req.body.date);
          let exerciseLog = new Exercise({
            user: req.body.userId,
            date: date,
            description: req.body.description,
            duration: req.body.duration
          });
          exerciseLog.save(function(err) {
            // TODO: Error handling
            let result = {
              _id: userQueryResult._id,
              username: userQueryResult.username,
              date: exerciseLog.date.toDateString(),
              description: exerciseLog.description,
              duration: exerciseLog.duration
            };
            res.json(result);  
          });
        }
    });
}

exports.get_exercises = function(req, res) {
    User.findOne( { _id: req.query.userId} , function (err, userQueryResult) {
        if(err){
          res.sendStatus(404);
        }
        if (userQueryResult) { // Found the user
          let query = Exercise.find({user: req.query.userId});
          if(req.query.from){
            query.where('date', { $gte: new Date(req.query.from) });
          }
          if(req.query.to){
            query.where('date', { $lte: new Date(req.query.to) });
          }
          if(req.query.limit){
            query.limit(+req.query.limit);
          }
          query.exec(function(err, exerciseQueryResults) {
            if(err){
              return next(err);
            }
            let mappedResults = exerciseQueryResults.map(exercise => {
              return {
                date: exercise.date,
                description: exercise.description,
                duration: exercise.duration
              };
            })
            let result = {
              _id: userQueryResult._id,
              username: userQueryResult.username,
              count: mappedResults.length,
              log: mappedResults
            }
            res.json(result);
          });
          
        } else {
          res.sendStatus(404);
        }
    });
}
