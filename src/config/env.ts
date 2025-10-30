import dotenv from 'dotenv';
dotenv.config();

interface Env {
    CLIENT_ADDRESS: string;
    SEARCH_API_ENDPOINT: string;
    SEARCH_API_KEY: string;
    SEARCH_ENGINE_ID: string;
    WEATHER_API_ENDPOINT: string;
    NEWS_API_ENDPOINT: string;
    NEWS_API_KEY: string;
};

export const env: Env = {
    CLIENT_ADDRESS: process.env.CLIENT_ADDRESS || 'http://localhost:80',
    SEARCH_API_ENDPOINT: process.env.SEARCH_API_ENDPOINT || 'https://',
    SEARCH_API_KEY: process.env.SEARCH_API_KEY || '0000',
    SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID || '0000',
    WEATHER_API_ENDPOINT: process.env.WEATHER_API_ENDPOINT || 'https://',
    NEWS_API_ENDPOINT: process.env.NEWS_API_ENDPOINT || 'https://',
    NEWS_API_KEY: process.env.NEWS_API_KEY || '0000',
};