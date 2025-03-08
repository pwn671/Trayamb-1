import fs from 'fs';
import jwt from 'jsonwebtoken'

import { FileUploadeToColoudinary } from '../libs/Cloudinary.js';
import UserModal from '../models/User.js';
import bcrypt from 'bcryptjs'

const Register = async (req, res) => {
    try {
        const {name, username, email, phonenumber, password, confirmpassword}=req.body;
           // Validate input fields
    if (!name) {
        return res.status(400).send({
          success: false,
          message: "Name is required",
        });
      }
      if (!username) {
        return res.status(400).send({
          success: false,
          message: "UserName is required",
        });
      }
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email is required",
        });
      }
      if (!phonenumber) {
        return res.status(400).send({
          success: false,
          message: "Phone number is required",
        });
      }
      if (!password || password.length < 6) {
        return res.status(400).send({
          success: false,
          message: "Password is required and must be at least 6 characters long",
        });
      }
      if (!confirmpassword || confirmpassword.length < 6) {
        return res.status(400).send({
          success: false,
          message:
            "Confirm password is required and must be at least 6 characters long",
        });
      }
      if (password !== confirmpassword) {
        return res.status(400).send({
          success: false,
          message: "Password and confirm password do not match",
        });
      }
        // Upload the image to Cloudinary
        const imagePath = req.file.filename;
        // const cloudinaryResult = await FileUploadeToColoudinary(imagePath, 'user_profiles');
          console.log(imagePath)
        // Create a new user with the uploaded image URL
        const existUser= await UserModal.findOne({email})
        if (existUser) {
            return res.status(301).json({success:false,message:"User Already Exist Please Login"})
        }
        const hasePassword= await bcrypt.hashSync(password,10)
        const newUser = new UserModal({
            name: name,
            email: email,
            username: username,
            phonenumber: phonenumber,
            password: hasePassword,
            confirmpassword: hasePassword,
            profile: imagePath,
        });

        // Save the user to the database
        await newUser.save();

        // // Remove the image from the local directory after uploading to Cloudinary
        // fs.unlinkSync(imagePath);

        res.status(201).json({success:true, message: 'User registered successfully',user:newUser});
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const FindUser = await UserModal.findOne({ email });
        if (!FindUser) {
            return res.status(404).json({ success: false, message: "Account not found. Please register." });
        }
        const comparePassword = await bcrypt.compare(password, FindUser.password);
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
        });
        
        return res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const Logout=async(req,res)=>{
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Return success message
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Handle error
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { FullName, oldpassword, newpassword } = req.body;

//         // Find the user by ID
//         const ExistUser = await UserModal.findById(userId);
//         if (!ExistUser) {
//             return res.status(404).json({ success: false, message: "Account not found." });
//         }

//         // Check if old password and new password are provided and validate old password
//         if (oldpassword) {
//             const comparePassword = await bcrypt.compare(oldpassword, ExistUser.password);
//             if (!comparePassword) {
//                 return res.status(401).json({ success: false, message: "Old password is incorrect." });
//             }
//         }

//         // Update FullName if provided
//         if (FullName) {
//             ExistUser.FullName = FullName;
//         }

//         // Update password if old and new passwords are provided and valid
//         if (oldpassword && newpassword) {
//             const hashedPassword = await bcrypt.hash(newpassword, 10);
//             ExistUser.password = hashedPassword;
//         } else if (oldpassword && !newpassword) {
//             return res.status(400).json({ success: false, message: "New password is required when old password is provided." });
//         }

        

    
//         await ExistUser.save();

//         // Return success response
//         res.status(200).json({ success: true, message: "Profile updated successfully.", user: ExistUser });

//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// const updateProfile = async (req, res) => {
//   try {
//       const userId = req.params.id;
//       const { FullName, oldpassword, newpassword } = req.body;

//       // Find user
//       const ExistUser = await UserModal.findById(userId);
//       if (!ExistUser) {
//           return res.status(404).json({ success: false, message: "Account not found." });
//       }

//       // Validate old password before changing password
//       if (oldpassword && newpassword) {
//           const comparePassword = await bcrypt.compare(oldpassword, ExistUser.password);
//           if (!comparePassword) {
//               return res.status(401).json({ success: false, message: "Old password is incorrect." });
//           }
//           ExistUser.password = await bcrypt.hash(newpassword, 10);
//       } else if (oldpassword && !newpassword) {
//           return res.status(400).json({ success: false, message: "New password is required when old password is provided." });
//       }

//       // Update Full Name if provided
//       if (FullName) {
//           ExistUser.FullName = FullName;
//       }

//       // Update profile image if uploaded
//       if (req.file) {
//           ExistUser.profile = req.file.filename; // Store filename in DB (or use Cloudinary)
//       }

//       await ExistUser.save();

//       res.status(200).json({ success: true, message: "Profile updated successfully.", user: ExistUser });

//   } catch (error) {
//       console.error("Error updating profile:", error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

const updateProfile = async (req, res) => {
  try {
      const userId = req.params.id;
      const { name, oldpassword, newpassword } = req.body;

      console.log("Update Profile Request:", {
          userId,
          name,
          hasOldPassword: !!oldpassword,
          hasNewPassword: !!newpassword,
          hasProfileImage: !!req.file
      });

      // Find User
      const ExistUser = await UserModal.findById(userId);
      if (!ExistUser) {
          console.warn(`Profile update failed: User ${userId} not found`);
          return res.status(404).json({ success: false, message: "Account not found." });
      }

      // 🔹 **1. Update Name**
      if (name) {
          console.log(`Updating name from ${ExistUser.name} to ${name}`);
          ExistUser.name = name;
      }

      // 🔹 **2. Update Password (if provided)**
      if (oldpassword && newpassword) {
          const comparePassword = await bcrypt.compare(oldpassword, ExistUser.password);
          if (!comparePassword) {
              console.warn(`Password update failed: Incorrect old password for user ${userId}`);
              return res.status(401).json({ success: false, message: "Old password is incorrect." });
          }
          ExistUser.password = await bcrypt.hash(newpassword, 10);
          console.log(`Password updated for user ${userId}`);
      }

      // 🔹 **3. Update Profile Image (if uploaded)**
      if (req.file) {
          console.log(`Updating profile image for user ${userId}:`, {
              oldImage: ExistUser.profile,
              newImage: req.file.filename
          });
          ExistUser.profile = req.file.filename; // Save file name in DB
      }

      await ExistUser.save();

      res.status(200).json({ 
          success: true, 
          message: "Profile updated successfully!", 
          user: {
            _id: ExistUser._id,
            name: ExistUser.name,
            profile: ExistUser.profile,
            email: ExistUser.email
          }
      });

  } catch (error) {
      console.error("Detailed Error updating profile:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export {Register,Login,Logout,updateProfile}

