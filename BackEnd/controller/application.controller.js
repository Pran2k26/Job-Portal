import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyForJob = async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id is the ID of the authenticated user
    const jobId = req.params.id; // Assuming jobId is passed as a URL parameter
    // Assuming jobId is passed as a URL parameter
    if (!jobId) {
      return res.status(400).json({
        message: ' Job ID is required',
        success: false,
      });
    }

    //check if the user has already applied for this job
    const existApplication = await Application.findOne({ applicant: userId, job: jobId });
    if (existApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job',
        success: false,
      });
    }
    //check if job exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    const newApplication = await Application.create({
      // Assuming you have a resume field in the request body
      applicant: userId,
      job: jobId,
      // Assuming resume is sent in the request body
    });
   job.applications.push(newApplication._id);
    await job.save();
    // Add user to the job's applicants list

    // Here you would typically save the application to the database
    // For example:
    // const application = await Application.create({
    //   userId: req.id, // Assuming req.id is the ID of the authenticated user
    //   jobId,
    //   resume,
    // });

    return res.status(200).json({
      message: 'Application submitted successfully',
      success: true,
      // application, // You can return the created application if needed
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const getAppliedJobs= async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id is the ID of the authenticated user
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application ) {
      return res.status(404).json({
        message: 'No applications found for this user',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Applications retrieved successfully',
      success: true,
      applications: application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};


//admin dekhega kitne apply kiye hai 
export const getApplicants = async (req, res) => {
 try{
    const jobId = req.params.id; // Assuming jobId is passed as a URL parameter
   
    //check if job exist
    const job = await Job.findById(jobId).populate({
        path:'applications',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'applicant',
    }});
    if (!job) {
        return res.status(404).json({
        message: 'Job not found',
        success: false,
        });
    }
    return res.status(200).json({
      message: 'Applicants retrieved successfully',
      success: true,
     job,
    });
}catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  } }

  export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // Assuming status is sent in the request body
    const applicationId = req.params.id; // Assuming applicationId is passed as a URL parameter

    if (!status ) {
      return res.status(400).json({
        message: 'Status id  is required',
        success: false,
      });
    }

    const application = await Application.findById({_id: applicationId});
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
        success: false,
      });
    }
    // Update the status of the application
    application.status = status.toLowerCase();
    await application.save();   
    return res.status(200).json({
      message: 'Application status updated successfully',
      success: true,
      application,
    }); 
    }
    catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
    }
}
      