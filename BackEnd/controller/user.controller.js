import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';
export const register = async (req, res) => {
  try {
    const { fullname, phoneNumber, email, password, role } = req.body;
    // Validate input
    if (!fullname || !phoneNumber || !email || !password || !role) {
      return res.status(400).json({
        message: 'Something is missing ',
        success: false,
      });
    }

//     const file = req.file;
//      const fileUri= getDataUri(file);
//  const cloudResponse= await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists with this email',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      // profile:{
      //   profilePhoto:cloudResponse.secure_url,
      // },
    });

//     if (!req.file) {
//   return res.status(400).json({
//     message: 'Profile photo is required',
//     success: false,
//   });
// }
    return res.status(201).json({
      message: 'User created successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
 return res.status(500).json({
    message: error.message || 'Registration failed',
    success: false
  });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        message: 'Something is missing',
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'incorrect password or email',
        success: false,
      });
    }

    if ( role!= user.role ) {
      return res.status(400).json({
        message: 'account does not exist with this role ',
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };
    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something is wrong here',
      success: false,
    });
  }
};



export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie('token', '', {
        maxAge: 0,
      })
      .json({
        message: 'Logout successfully',
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something is wrong here',
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // const UserId = req.user._id;

    // if (!bio || !skills || !fullName || !email || !phonenumber) {
    //   return res.status(400).json({
    //     message: 'Something is missing',
    //     success: false,
    //   });
    // }

    //cloudanary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



    let skillsArray;
    if (skills) {
      skillsArray = skills.split(',');
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    //updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // user.fullname = fullName;
    // user.email = email;
    // user.phoneNumber = phonenumber;
    // user.profile.bio = bio;
    // user.profile.skill = skillsArray;

    //resume wil come here

    if(cloudResponse){
      user.profile.resume=cloudResponse.secure_url // save the cloudanry url
      user.profile.resumeOriginalName=file.originalname//save the original file name
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
      phoneNumber: user.phoneNumber,
    };

    return res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something is wrong here',
      success: false,
    });
  }
};