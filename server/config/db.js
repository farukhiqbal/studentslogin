import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
        // Optionally, you can exit the process if the connection fails
        process.exit(1);
    }
}

export default connectDB;
