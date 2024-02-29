// blogRoutes.js

// routes/blogRoutes.js

import express from 'express';
import upload from '../middleware/studentsMiddleware.js';
import { loginStudentController, registerStudentController } from '../Controller/Studentcontroller.js';


const router = express.Router();

// Create a new blog
router.post('/studentRegister', upload.single('image'), registerStudentController );

router.post('/loginstudents',loginStudentController)




export default router;
