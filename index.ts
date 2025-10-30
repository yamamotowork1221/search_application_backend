import { env } from './src/config/env';
import searchRoute from './src/routes/searchRoute';
import newsRoute from './src/routes/newsRoute';
import weatherRoute from './src/routes/weatherRoute';
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const allowedOrigins = [
    env.CLIENT_ADDRESS.trim().replace(/\/$/, '').toLowerCase(),
    'http://localhost:3000',
];

console.log('🌐 Request Origin:', origin);

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) {
            console.warn('❌ CORS blocked: Origin header missing');
            return callback(new Error('Not allowed by CORS'));
        }

        const cleanOrigin = origin.replace(/\/$/, '').toLowerCase();
        const isAllowed = allowedOrigins.includes(cleanOrigin);

        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn(`❌ CORS blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));