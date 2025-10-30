import { news } from '../../src/controllers/newsController'
import express from 'express';

const newsRoute = express.Router();

newsRoute.get('/', news);

export default newsRoute;