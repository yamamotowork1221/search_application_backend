import { search } from '../../src/controllers/searchController.ts'
import express from 'express';

const searchRoute = express.Router();

searchRoute.get('/', search);

export default searchRoute;