import { env } from '../../src/config/env.ts'
import { apiGetServices } from '../../src/services/apiGetServices.ts'
import type { Request, Response } from 'express';

export const weather = async (req: Request, res: Response) => {

    const weatherApiAdoresu: string = env.WEATHER_API_ENDPOINT || '';

    const cityId: string = (req.query.q as string) || "130010";

    const url: string = `${weatherApiAdoresu}${cityId}`;

    try {
        const response = await apiGetServices(url);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    };
};