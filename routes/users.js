var express = require('express');
var router = express.Router();
const {posst,getUserByname,createuser,follw,getaa}=require('../controllers/user.controllers')
/* GET users listing. */
router.get('/api/get-user/:username',getUserByname);
router.post("/api/create-user/",createuser)
router.post("/api/follow/:usernameA/:usernameB",follw)
router.post("/api/create-post/:username",posst)
router.post("/api/all-posts/:usernameA",getaa)

module.exports = router;
