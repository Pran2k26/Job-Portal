import express from 'express';


// import { User } from '../models/user.model.js';      
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getComapanyById, getCompany, registerCompany, updateCompany } from '../controller/company.controller.js';
import { singleUploaded } from '../middlewares/multer.js';
const router = express.Router();
router.route('/register').post(isAuthenticated, registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getComapanyById);

router.route('/update/:id').put(isAuthenticated ,singleUploaded, updateCompany);
 
export default router;  
//     }