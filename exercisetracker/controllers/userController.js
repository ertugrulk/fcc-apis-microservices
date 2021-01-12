const User = require("../models/user");

exports.get_users = function(req, res) {
    User.find({}, function(err, queryResult) {
        if(err){
            return next(err);
        } else {
            res.json(queryResult);
        }
    });
}

exports.post_user = function(req, res) {
    let username = req.body.username;
    User.findOne( { username: username} , function (err, queryResult) {
        if(err){
            return next(err);
        }
        if (queryResult) {
            res.send("Username already taken");
        } else {
            let user = new User({username: username});
            user.save(function(err) {
                // TODO: Error handling
                res.json(user);
            })
        }
    });
}

