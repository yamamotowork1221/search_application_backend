import { env } from '../../src/config/env.ts'
import { apiGetServices } from '../../src/services/apiGetServices.ts'
import type { Request, Response } from 'express';

export const search = async (req: Request, res: Response) => {

    const searchApiAdoresu: string = env.SEARCH_API_ENDPOINT || '';
    const searchApiKey: string = env.SEARCH_API_KEY || '';
    const searchEngineId: string = env.SEARCH_ENGINE_ID || '';

    const searchTerm: string = (req.query.q as string) || "";
    const requestPage: string = (req.query.p as string) || "1";
    const searchStart: string = String(10 * (Number(requestPage) - 1) + 1) || "1";

    const url: string = `${searchApiAdoresu}?key=${searchApiKey}&cx=${searchEngineId}&q=${encodeURIComponent(searchTerm)}&start=${searchStart}`;

    try {
        const response = await apiGetServices(url);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    };
};