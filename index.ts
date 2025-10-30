import { env } from './src/config/env';
import searchRoute from './src/routes/searchRoute';
import newsRoute from './src/routes/newsRoute';
import weatherRoute from './src/routes/weatherRoute';
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const allowedOrigins = [process.env.CLIENT_ADDRESS as string];

app.use((req, res, next) => {
    const allowedOrigins = ['https://search-application-frontend.onrender.com'];
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
});

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));