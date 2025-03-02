import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  quote: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  quoteAuthor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  sections: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
      },
      imageUrl: {
        type: String,
        default: '',
        validate: {
          validator: function(v) {
            // Allow empty strings
            if (!v) return true;
            
            // Check for full URLs (http or https)
            const urlPattern = /^(https?:\/\/).*\.(jpg|jpeg|png|gif|webp)$/i;
            
            // Check for local upload paths (starts with /uploads/ or full local path)
            const localUploadPattern = /^(\/uploads\/|http:\/\/localhost:5000\/uploads\/).*\.(jpg|jpeg|png|gif|webp)$/i;
            
            return urlPattern.test(v) || localUploadPattern.test(v);
          },
          message: props => `${props.value} is not a valid image URL!`
        }
      },
      order: {
        type: Number,
        default: 0
      }
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model("About", AboutSchema);
