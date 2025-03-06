// import express from 'express'
// import dotenv from 'dotenv'
// import AuthRoutes from './routes/Auth.js'
// import DBCon from './libs/db.js'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import BlogRoutes from './routes/Blogs.js'
// import DashboardRoutes from './routes/Dashboard.js'
// import CommentRoutes from './routes/Comments.js'
// import PublicRoutes from './routes/Public.js'
// import AboutRoutes from "./routes/About.js";
// import UploadRoutes from "./routes/UploadRoutes.js";
// import ContactRoutes from './routes/Contact.js';
// import projectRoutes from './routes/Project.js';

// dotenv.config()

// const PORT=process.env.PORT || 4000
// const app=express()
// DBCon()
// app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send('hello from server')
// })
// app.use(express.static('public'))
// app.use(cookieParser())
// const corsOptoins={
//     origin:true,
//     credentials:true
// }
// //   const corsOptoins={
// //   origin: '*',
// //     credentials:true
// // }
// app.use(cors(corsOptoins))

// // app.use(cors({ origin: 'https://trayambassociates.netlify.app' }));
// app.use('/auth',AuthRoutes)
// app.use('/blog',BlogRoutes)
// app.use('/dashboard',DashboardRoutes)
// app.use('/comment',CommentRoutes)
// app.use('/public',PublicRoutes)

// app.use('/api/projects', projectRoutes);

// app.use('/contact', ContactRoutes);
// app.use('/uploads', express.static('uploads'));
// app.use("/api/about", AboutRoutes);
// app.use("/api/upload", UploadRoutes);
// app.listen(PORT,()=>{
//     console.log(`App is running on Port ${PORT}`)
// })

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/Auth.js';
import DBCon from './libs/db.js';
import BlogRoutes from './routes/Blogs.js';
import DashboardRoutes from './routes/Dashboard.js';
import CommentRoutes from './routes/Comments.js';
import PublicRoutes from './routes/Public.js';
import AboutRoutes from './routes/About.js';
import UploadRoutes from './routes/UploadRoutes.js';
import ContactRoutes from './routes/Contact.js';
import projectRoutes from './routes/Project.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Connect to Database
DBCon();

// ✅ Middleware setup
app.use(cookieParser());  // First, parse cookies
app.use(express.json());  // Then, parse JSON body
app.use(express.static('public'));  // Serve static files

// ✅ CORS Configuration
const allowedOrigins = [
    'https://trayambassociates.netlify.app', 
    'http://localhost:3000'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ✅ Routes
app.get('/', (req, res) => {
    res.send('Hello from server!');
});
app.use('/auth', AuthRoutes);
app.use('/blog', BlogRoutes);
app.use('/dashboard', DashboardRoutes);
app.use('/comment', CommentRoutes);
app.use('/public', PublicRoutes);
app.use('/api/projects', projectRoutes);
app.use('/contact', ContactRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/about', AboutRoutes);
app.use('/api/upload', UploadRoutes);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

