import express from 'express';
import { register } from '../controller/user.controller.js';
import { login } from '../controller/user.controller.js';
import { updateProfile } from '../controller/user.controller.js';
import { logout } from '../controller/user.controller.js';
import { singleUploaded } from '../middlewares/multer.js';
 

// import { User } from '../models/user.model.js';      
import isAuthenticated from '../middlewares/isAuthenticated.js';
//import { singleUploaded } from '../middlewares/multer.js';
const router = express.Router();
router.route('/register').post( singleUploaded
    ,register);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/profile/update').post(isAuthenticated ,singleUploaded,updateProfile);
 
export default router;  
//     }