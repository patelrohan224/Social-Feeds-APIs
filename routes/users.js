var express = require('express');
var router = express.Router();
const {posst,getUserByname,createuser,follw,newrew}=require('../controllers/user.controllers')
/* GET users listing. */
router.get('/api/get-user/:username',getUserByname);
router.post("/api/create-user/",createuser)
router.post("/api/follow/:usernameA/:usernameB",follw)
router.post("/api/create-post/:username",posst)
router.get("/api/all-posts/:usernameA",newrew)

module.exports = router;
