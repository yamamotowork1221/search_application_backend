import { env } from './src/config/env';
import searchRoute from './src/routes/searchRoute';
import newsRoute from './src/routes/newsRoute';
import weatherRoute from './src/routes/weatherRoute';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import type { Application } from 'express';
import cors from 'cors';

const app: Application = express();

const allowedIps = [env.CLIENT_IP_ADDRESS];

function ipToNumber(ip: string): number {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function isIpInSubnet(ip: string, cidr: string): boolean {
    if (!cidr.includes('/')) {
        return ip === cidr;
    }

    const [subnet, maskLength] = cidr.split('/');
    const mask = ~(2 ** (32 - Number(maskLength)) - 1);
    return (ipToNumber(ip) & mask) === (ipToNumber(subnet) & mask);
}

export const ipWhitelist = (req: Request, res: Response, next: NextFunction) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    const clientIp = Array.isArray(xForwardedFor)
        ? xForwardedFor[0]
        : xForwardedFor || req.socket.remoteAddress || '';

    const allowed = allowedIps.some(cidr => isIpInSubnet(clientIp, cidr));

    if (!allowed) {
        return res.status(403).send('アクセス拒否');
    }

    next();
};

app.use('/searchservice', searchRoute);
app.use('/newsservice', newsRoute);
app.use('/weatherservice', weatherRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));