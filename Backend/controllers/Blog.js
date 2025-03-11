import Blgomodel from "../models/Blog.js";
import slugify from 'slugify';

import fs from 'fs';
import path from 'path';

const Create = async (req, res) => {
    try {
        console.log('Blog Creation Request:', {
            body: req.body,
            file: req.file,
            user: req.user
        });

        // Check for file upload validation error
        if (req.fileValidationError) {
            return res.status(400).json({ 
                success: false, 
                message: req.fileValidationError 
            });
        }

        const { title, desc } = req.body;
        const image = req.file ? req.file.filename : null;

        // Trim and validate inputs
        const trimmedTitle = title ? title.trim() : '';
        const trimmedDesc = desc ? desc.trim() : '';

        // Check if title and description are provided
        if (!trimmedTitle || !trimmedDesc) {
            console.warn('Blog creation failed: Missing title or description');
            return res.status(400).json({ 
                success: false, 
                message: 'Title and description are required' 
            });
        }

        // Explicitly generate slug
        const slug = slugify(trimmedTitle, { lower: true, strict: true });

        // Create the blog post with the provided data
        const CreateBlog = new Blgomodel({
            title: trimmedTitle,
            desc: trimmedDesc,
            image,
            slug  // Add the generated slug
        });

        // Save the blog post to the database
        await CreateBlog.save();

        // Return success response with blog details including createdAt
        return res.status(201).json({ 
            success: true, 
            message: 'Blog post created successfully',
            blog: {
                title: CreateBlog.title,
                desc: CreateBlog.desc,
                image: CreateBlog.image,
                slug: CreateBlog.slug,
                createdAt: CreateBlog.createdAt  
            }
        });
    } catch (error) {
        console.error('Blog Creation Error:', error);
        
        // Handle Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: 'A blog with a similar title already exists', 
                details: error.message 
            });
        }

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation Error', 
                details: messages 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Internal server error', 
            details: error.message 
        });
    }
}

// const update = async (req, res) => {
//     try {
//         console.log('FULL Update Request:', {
//             body: req.body,
//             files: req.files,
//             params: req.params,
//             user: req.user
//         });

//         // Debug logging for file upload
//         if (req.files) {
//             console.log('Uploaded Files Details:', JSON.stringify(req.files, null, 2));
//         }

//         const { title, desc } = req.body;  
//         const blogId = req.params.id;

//         // Extensive input validation
//         if (!blogId) {
//             console.error('Update Error: No Blog ID provided');
//             return res.status(400).json({
//                 success: false,
//                 message: 'Blog ID is required'
//             });
//         }

//         // Validate input
//         if (!title && !desc && !req.files) {
//             console.error('Update Error: No update data provided');
//             return res.status(400).json({
//                 success: false,
//                 message: 'No update data provided'
//             });
//         }

//         // Find the existing blog post
//         const existingBlog = await Blgomodel.findById(blogId);
//         if (!existingBlog) {
//             console.error(`Update Error: Blog not found with ID ${blogId}`);
//             return res.status(404).json({
//                 success: false,
//                 message: 'Blog post not found'
//             });
//         }

//         // Update title if provided
//         if (title) {
//             existingBlog.title = title.trim();
//             existingBlog.slug = slugify(title, { lower: true, strict: true });
//         }

//         // Update description if provided
//         if (desc) {
//             existingBlog.desc = desc.trim();
//         }

//         // Update image if a new file is uploaded
//         if (req.files && req.files.postimg) {
//             const newImage = req.files.postimg[0];
            
//             console.log('New Image Details:', {
//                 filename: newImage.filename,
//                 path: newImage.path,
//                 mimetype: newImage.mimetype
//             });

//             // Delete old image if it exists
//             if (existingBlog.image) {
//                 const oldImagePath = path.join(process.cwd(), 'public', 'images', existingBlog.image);
//                 try {
//                     fs.unlinkSync(oldImagePath);
//                     console.log(`Old image deleted: ${oldImagePath}`);
//                 } catch (err) {
//                     console.warn('Could not delete old image:', err);
//                 }
//             }

//             existingBlog.image = newImage.filename;
//         }

//         // Save the updated blog with validation
//         try {
//             await existingBlog.validate();
//         } catch (validationError) {
//             console.error('Validation Error:', validationError);
//             return res.status(400).json({
//                 success: false,
//                 message: 'Validation failed',
//                 details: validationError.errors
//             });
//         }

//         await existingBlog.save();

//         return res.status(200).json({
//             success: true,
//             message: 'Blog updated successfully',
//             blog: {
//                 id: existingBlog._id,
//                 title: existingBlog.title,
//                 desc: existingBlog.desc,
//                 image: existingBlog.image,
//                 slug: existingBlog.slug
//             }
//         });

//     } catch (error) {
//         console.error('CRITICAL Blog Update Error:', {
//             name: error.name,
//             message: error.message,
//             stack: error.stack,
//             code: error.code
//         });
        
//         // Handle Mongoose duplicate key error
//         if (error.code === 11000) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'A blog with a similar title already exists', 
//                 details: error.message 
//             });
//         }

//         // Handle Mongoose validation errors
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Validation Error', 
//                 details: messages 
//             });
//         }

//         // Catch-all for unexpected errors
//         res.status(500).json({ 
//             success: false, 
//             message: 'Internal server error', 
//             details: error.message || 'Unknown error occurred',
//             fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
//         });
//     }
// }
const update = async (req, res) => {
    try {
        console.log('FULL Update Request:', {
            body: req.body,
            file: req.file,  
            params: req.params,
            user: req.user
        });

        const { title, desc } = req.body;  
        const blogId = req.params.id;

        // Extensive input validation
        if (!blogId) {
            console.error('Update Error: No Blog ID provided');
            return res.status(400).json({
                success: false,
                message: 'Blog ID is required'
            });
        }

        // Validate input
        if (!title && !desc && !req.file) {
            console.error('Update Error: No update data provided');
            return res.status(400).json({
                success: false,
                message: 'No update data provided'
            });
        }

        // Find the existing blog post
        const existingBlog = await Blgomodel.findById(blogId);
        if (!existingBlog) {
            console.error(`Update Error: Blog not found with ID ${blogId}`);
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Update title if provided
        if (title) {
            existingBlog.title = title.trim();
            existingBlog.slug = slugify(title, { lower: true, strict: true });
        }

        // Update description if provided
        if (desc) {
            existingBlog.desc = desc.trim();
        }

        // Update image if a new file is uploaded
        if (req.file) {
            console.log('Image Upload Details:', {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                fieldname: req.file.fieldname,
                size: req.file.size
            });

            // Validate file size and type
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

            if (req.file.size > maxFileSize) {
                console.error('Image Upload Error: File too large');
                return res.status(400).json({
                    success: false,
                    message: 'Image file is too large. Maximum size is 5MB.'
                });
            }

            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                console.error('Image Upload Error: Invalid file type');
                return res.status(400).json({
                    success: false,
                    message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
                });
            }

            // Delete old image if it exists
            if (existingBlog.image) {
                const oldImagePath = path.join(process.cwd(), 'public', 'images', existingBlog.image);
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log(`Old image deleted: ${oldImagePath}`);
                } catch (err) {
                    console.warn('Could not delete old image:', err);
                }
            }

            existingBlog.image = req.file.filename;
        }

        // Save the updated blog with validation
        try {
            await existingBlog.validate();
        } catch (validationError) {
            console.error('Validation Error:', validationError);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                details: validationError.errors
            });
        }

        const updatedBlog = await existingBlog.save();
        console.log('Updated Blog:', updatedBlog);

        return res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            blog: {
                id: updatedBlog._id,
                title: updatedBlog.title,
                desc: updatedBlog.desc,
                image: updatedBlog.image,
                slug: updatedBlog.slug
            }
        });

    } catch (error) {
        console.error('Blog Update Error:', error);
        
        // Handle Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: 'A blog with a similar title already exists', 
                details: error.message 
            });
        }

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation Error', 
                details: messages 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'Internal server error', 
            details: error.message 
        });
    }
}

const GetPosts=async(req,res)=>{
    try {
        // Fetch all blog posts, sorted by creation date in descending order
        const posts = await Blgomodel.find().sort({ createdAt: -1 });
       
        if (!posts) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true,  posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const GetPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        // Validate postId
        if (!postId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Blog post ID is required' 
            });
        }

        // Find the blog post by ID
        const post = await Blgomodel.findById(postId);

        // Check if post exists
        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: 'Blog post not found' 
            });
        }

        // Return the blog post
        res.status(200).json({ 
            success: true, 
            post: {
                _id: post._id,
                title: post.title,
                desc: post.desc,
                image: post.image,
                slug: post.slug,
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error('Get Blog Post By ID Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error', 
            details: error.message 
        });
    }
}

const DeleteBlog=async(req,res)=>{
    try {
        const postid=req.params.id
        const posts= await Blgomodel.findById(postid)
       
        if (!posts) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        if (posts.image) {
            const profilePath = path.join('public/images', posts.image);
            fs.promises.unlink(profilePath)
                .then(() => console.log('Profile image deleted'))
                .catch(err => console.error('Error deleting profile image:', err));
        }
        const deletepost=await Blgomodel.findByIdAndDelete(postid)
        res.status(200).json({ success: true, message:"Post Delete Successfully",  post:deletepost });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { Create, update,GetPosts,GetPostById,DeleteBlog };
