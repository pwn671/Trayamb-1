import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  }, 
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bedroom', 'Bathroom', 'Kitchen', 'Living Area']
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
