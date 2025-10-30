import { env } from '../../src/config/env'
import { gettoNewsApiConfig } from '../../src/config/config'
import { apiGetServices } from '../../src/services/apiGetServices'
import type { Request, Response } from 'express';

let cache: any = null;
let lastUpdated: number = 0;

export const news = async (req: Request, res: Response) => {

    const newsApiAdoresu: string = env.NEWS_API_ENDPOINT || '';
    const newsApiKey: string = env.NEWS_API_KEY || '';

    const countryCode: string = (req.query.q as string) || "jp";

    const url: string = `${newsApiAdoresu}?country=${countryCode}&apikey=${newsApiKey}`;
    const hour: number = gettoNewsApiConfig.newsApiCacheTtlHour;

    try {
        const now = Date.now();
        if (cache && now - lastUpdated < hour * 60 * 60 * 1000) {
            return res.json(cache);
        }
        const response = await apiGetServices(url);
        cache = response;
        lastUpdated = now;
        res.json(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    };
};