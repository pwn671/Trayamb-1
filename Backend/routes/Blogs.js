import express from 'express'
import { Create, DeleteBlog, GetPosts, update, GetPostById } from '../controllers/Blog.js'
import { upload } from '../middleware/Multer.js'
import { isAdmin } from '../middleware/CheckAdmin.js'

const BlogRoutes= express.Router()


BlogRoutes.post('/create',isAdmin,upload.single('postimg'),Create)
// BlogRoutes.patch('/update/:id',isAdmin,upload.single('postimg'),update)
//BlogRoutes.post('/update/:id',isAdmin,upload.single('postimg'),update)
BlogRoutes.get('/GetPosts',GetPosts)
BlogRoutes.get('/GetPostById/:id',isAdmin,GetPostById)
BlogRoutes.delete('/delete/:id',DeleteBlog)

BlogRoutes.put('/update/:id', isAdmin, upload.single('postimg'), update)



export default BlogRoutes