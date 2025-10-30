import dotenv from 'dotenv';
dotenv.config();

interface GettoNewsApiConfig {
    newsApiCacheTtlHour: number;
};

export const gettoNewsApiConfig: GettoNewsApiConfig = {
    newsApiCacheTtlHour: Number(process.env.NEWS_API_CACHE_TTL_HOUR) || 1,
};