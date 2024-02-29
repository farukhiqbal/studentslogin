import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Assuming connectDB is exported from db.js as an ES module
import dotenv from 'dotenv';
import studentsRoutes  from './routes/studentsRoutes.js'
import Path  from 'path';

const app = express();




// Enable CORS
app.use(cors(
  
));

// Configure env
dotenv.config();

app.use(express.json());

// Database config
connectDB();




// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

app.use('/api', studentsRoutes);





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
