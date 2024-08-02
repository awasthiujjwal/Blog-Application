const express = require ('express');
const { createpost, getallpost, Deletepost, Updatepost, Singlepost, getallusers, getyourallpost } = require('../controllers/postsController');
const router = express.Router ();

router.post ('/create',createpost);
router.get('/getpost/:_id',getyourallpost);
router.delete('/deletepost/:_id',Deletepost);
router.put('/update/:_id',Updatepost);
router.get('/singlepost/:_id',Singlepost);
router.get ('/allpost',getallusers)


module.exports = router
