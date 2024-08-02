const { createUser, login,  getalluser, deleteUsers, update, getsingleuser, verifyToken, forgetPassword, GetToken, updatePassword } = require("../controllers/Usercontroller");

const express = require ('express');
const verify = require("../middleware/verifyToken");
const router =express.Router();



router.post('/register',createUser)
router.post ('/login',login)
router.get ('/getusers',getalluser)
router.delete('/deleteUsers',deleteUsers)
router.put('/updateuser',update)
router .get('/singleuser/:_id',getsingleuser)
router .get('/reset-password/:token',GetToken)
router.delete ('/testing/:_id',verify,verifyToken)
router.post('/update-password/:token',updatePassword)
router.post('/ForgetPassword',forgetPassword)

module.exports = router;