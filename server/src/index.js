import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import routes from './routes/urlRoute.js';

const PORT = process.env.PORT || 8000;
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));

app.use('/', routes);

connectDB(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((e) => {
        console.error('MongoDB connection failed', e);
        process.exit(1);
    });
