import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicantRoute from './routes/applicants.route.js';

dotenv.config();
const app = express();

// app.get('/home', (req, res) => {
//     return res.status(200).json({
//         message: 'Welcome to the home page!',
//         status: 'success',
//     })

// });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Replace with your frontend URL
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


//api's
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicantRoute);

// this kind of api will we created

// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
