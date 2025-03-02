import mongoose from "mongoose";
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        trim: true,
      },
    email:{
        type:String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
    },
    phonenumber: {
        type: String,
        required: [true, 'Please add a phone number'],
        trim: true,
      },
    password:{
        type:String,
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
    profile:{
        type:String,
    },
    role:{
         type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{timestamps:true})

const UserModal=mongoose.model('User',UserSchema)

export default UserModal