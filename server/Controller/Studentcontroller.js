
import fs from 'fs'
import path from 'path';
// import { join } from 'path';
// import upload from '../middlewares/blogMiddleware.js';
// import hashedPassword from  '../helpers/authHelper';
import Student from '../model/studentModel.js';
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing





export const registerStudentController = async (req, res) => {
  try {
    const { name, address, phoneNumber, email, university, education, program, password } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    // Create a new student
    const newStudent = await Student.create({ name, address, phoneNumber, email, university, education, program, image, password: hashedPassword });

    // Return success message along with the newly created student data
    res.status(201).json({ message: 'Student registered successfully.', student: newStudent });
  
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
};




export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};






// POST LOGIN
export const loginStudentController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the student is registered
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Set isLoggedIn to true
    await Student.findByIdAndUpdate(student._id, { isLoggedIn: true });

    // Generate token
    const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      student: {
        _id: student._id,
        email: student.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};






















