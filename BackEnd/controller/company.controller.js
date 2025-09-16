import { Company } from '../models/company.meodel.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js'
export const registerCompany = async (req, res) => {
  try {
    console.log('Registering company for user:', req.id);
    // const { companyName } = req.body;
      const { companyName } = req.body;
    console.log("Request body:", req.body);
    // Validate input
    if (!companyName) {
      return res.status(400).json({
        message: 'Compnay name is missing',
        success: false,
      });
    }

    //find whether the comapny exist
     let company = await Company.findOne({ name: companyName });   //name: companyName
    if (company) {
      return res.status(400).json({
        message: 'Company already exists with this with this name',
        success: false,
      });
    }
    // Create new company
    company = await Company.create({
      // name: companyName, isko update kiya jaega 
      name:companyName,
      userId: req.id, // Assuming req.id is the ID of the user creating the company
    });
    console.log("New company ID:", company._id);

    return res.status(201).json({
      message: 'Company registered successfully',
      success: true,
      
      company // Return the ID of the newly created company

      
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id
     //userId = req.id; // Assuming req.id is the ID of the authenticated user
    const companies = await Company.find({ userId});
    if (!companies) {
      return res.status(404).json({
        message: 'No companies found for this user',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Companies retrieved successfully',
      success: true,
      companies,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const getComapanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // Assuming the company ID is passed as a URL parameter
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
        success: false,
      });
    }

    return res.status(200).json({
      // message: 'Company retrieved successfully',
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    // const companyId = req.params.id; // Assuming the company ID is passed as a URL parameter
    const { name, description, website, location } = req.body;
    const file = req.file; // Assuming the logo is uploaded as a file

    //idhar cloudanary aayega
    const fileUri= getDataUri(file);
    const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
     const logo = cloudResponse.secure_url;
     console.log('company logo is here')


    const updateData = {
      name,
      description,
      website,
      location,
      logo
    };

    // Find and update the company
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
        success: false,
      });
    }

    // company.name = companyName;
    // await company.save();

    return res.status(200).json({
      message: 'Company updated successfully',
      success: true,
      // company,
    });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({
    //   message: 'Internal server error',
    //   success: false,
    // });
  }
};
