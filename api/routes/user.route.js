import express from 'express';
import { deleteUser, signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test' , test);                                              // logic for test is written in controllers to make it look clean
router.put('/update/:userId' , verifyToken , updateUser);                // update -> put method , we will use the is to know which user is getting updated
router.delete('/delete/:userId' , verifyToken , deleteUser);
router.post('/signout', signout);

export default router;