import { env } from './src/config/env';
import searchRoute from './src/routes/searchRoute';
import newsRoute from './src/routes/newsRoute';
import weatherRoute from './src/routes/weatherRoute';
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const clientAdoresu: string = env.CLIENT_ADDRESS;

if (!clientAdoresu) {
    throw new Error('CLIENT_ADDRESS が未設定です');
}

const corsOptions = {
    origin: clientAdoresu,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

app.listen(8000, () => console.log('Example app listening on port 8000!'))