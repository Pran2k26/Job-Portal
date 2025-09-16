import { Job } from '../models/job.model.js';
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      jobType,
      experience,
      position,
      location,
      salary,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !companyId ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      company: companyId,
      location,
      salary: Number(salary),
      createdBy: userId,
      requirements: requirements.split(','),
      jobType,
      experience,
      position,
    });
    return res.status(201).json({
      message: 'new Job posted successfully',
      job,
      success: true,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'something is missing and Do it again',
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || '';
    const query = {
      $or: [
        { title: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: 'company',
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: 'No jobs found',
        success: false,
      });
    }

    return res.status(200).json({
      //   message: 'Jobs retrieved successfully',
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

//for the students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Assuming the job ID is passed as a URL parameter
    const job = await Job.findById(jobId).populate({
      path: 'applications',
    });

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Job retrieved successfully',
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: 'company',
      createdAt: -1,
    });

    if (!jobs || jobs.length == 0) {
      return res.status(404).json({
        message: 'No jobs found for this user',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Jobs retrieved successfully',
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
