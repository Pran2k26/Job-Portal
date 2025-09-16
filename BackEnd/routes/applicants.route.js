import express from 'express';     
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyForJob, getApplicants,  getAppliedJobs, updateApplicationStatus } from '../controller/application.controller.js';
const router = express.Router();
// Define routes for applicants

router.route('/apply/:id').post(isAuthenticated, applyForJob); // 
router.route('/get').get(isAuthenticated, getAppliedJobs); // 
router.route('/:id/applicants').get(isAuthenticated, getApplicants); //
router.route('/status/:id/update').post(isAuthenticated, updateApplicationStatus); // Update applicant status
// router.routeAssuming this is for applying to a job


 
export default router;  