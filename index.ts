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
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));