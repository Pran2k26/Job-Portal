import mongoose from 'mongoose';

const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['student', 'recruiter'], //add Recruiter
      required: true,
    },

    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: [{ type: String }],
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      profilePhoto: {
        type: String,
        default: 'https://i.pravatar.cc/150?img=8',
      },
    },
  },
  { timestamps: true }
);
export const User = mongoose.model('User', userschema);
