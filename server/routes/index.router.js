const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const ctrlUser = require('../controllers/user.controller');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.put('/profileupdate/:id',ctrlUser.profileupdate);
router.get('/getalluser',ctrlUser.getalluser);
router.delete('/deleteuser/:id',ctrlUser.deleteuser);

module.exports = router;