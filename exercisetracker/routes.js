const express = require('express');
const router = express.Router();

let userController = require("./controllers/userController");
let exerciseController = require("./controllers/exerciseController");
router.get('/api/exercise/users', userController.get_users);
router.post('/api/exercise/new-user', userController.post_user);
router.post('/api/exercise/add', exerciseController.post_exercise);
router.get('/api/exercise/log', exerciseController.get_exercises);

module.exports = router