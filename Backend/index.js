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
// app.use(cors(corsOptoins))
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
import AboutRoutes from "./routes/About.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import ContactRoutes from './routes/Contact.js';
import projectRoutes from './routes/Project.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
DBCon();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// ✅ Proper CORS Configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://trayambassociates.netlify.app'], // Apni frontend URL yahan daalo
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ✅ Manually Add CORS Headers (For Extra Safety)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello from server');
});
app.use('/auth', AuthRoutes);
app.use('/blog', BlogRoutes);
app.use('/dashboard', DashboardRoutes);
app.use('/comment', CommentRoutes);
app.use('/public', PublicRoutes);
app.use('/api/projects', projectRoutes);
app.use('/contact', ContactRoutes);
app.use("/api/about", AboutRoutes);
app.use("/api/upload", UploadRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on Port ${PORT}`);
});
