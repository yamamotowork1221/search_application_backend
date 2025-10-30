import { env } from './src/config/env';
import searchRoute from './src/routes/searchRoute';
import newsRoute from './src/routes/newsRoute';
import weatherRoute from './src/routes/weatherRoute';
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const allowedOrigin = 'https://search-application-frontend.onrender.com';

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Forbidden origin' });
    }
    next();
});

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));