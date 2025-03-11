import mongoose from "mongoose";
import slugify from 'slugify';  

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    image: {
        type: String,
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

// Pre-save middleware to generate slug
BlogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        // Generate a unique slug
        let slug = slugify(this.title, { lower: true, strict: true });
        
        // Append a unique identifier if slug already exists
        const generateUniqueSlug = async (baseSlug, count = 0) => {
            const slugToTry = count > 0 ? `${baseSlug}-${count}` : baseSlug;
            const existingPost = await this.constructor.findOne({ slug: slugToTry });
            
            if (existingPost) {
                return generateUniqueSlug(baseSlug, count + 1);
            }
            
            return slugToTry;
        };

        // Use an async function to generate unique slug
        generateUniqueSlug(slug)
            .then(uniqueSlug => {
                this.slug = uniqueSlug;
                next();
            })
            .catch(err => next(err));
    } else {
        next();
    }
});

const Blogmodel = mongoose.model("Posts", BlogSchema);

export default Blogmodel;