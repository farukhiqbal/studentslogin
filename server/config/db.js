import mongoose from 'mongoose';
import colors from 'colors';

// Global Promise Rejection Handler
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB database: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`Error in MongoDB connection: ${error}`.bgRed.white);
    }
};

export default connectDB;
