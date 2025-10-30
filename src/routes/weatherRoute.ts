import { weather } from '../../src/controllers/weatherController'
import express from 'express';

const weatherRoute = express.Router();

weatherRoute.get('/', weather);

export default weatherRoute;