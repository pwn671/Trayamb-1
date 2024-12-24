const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      maxlength: 64,
    },
    confirmpassword: {
      type: String,
      required: [true, 'Please confirm the password'],
      minlength: 6,
      maxlength: 64,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Enforces only 'user' or 'admin'
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
