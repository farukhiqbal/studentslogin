// models/Blog.js

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String, required: true },
    education: { type: String, required: true },
    program: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
  image: {
    type: String, // Assuming we'll store the path of the image in the database
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
