var express = require('express');
var router = express.Router();
const {getUserByname,createuser}=require('../controllers/user.controllers')
/* GET users listing. */
router.get('/api/get-user/:username',getUserByname);
router.post("/api/create-user/",createuser)

module.exports = router;
