// pages/api/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const redis = new Redis("localhost:6379")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url, ttl } = req.query;
    const TTL = parseInt(ttl as string);
    const URL = url as string;
    
    try {
        const cached = await redis.get(URL);
        if (cached) {
            return res.status(200).json(JSON.parse(cached));
        }

        // const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/${id}`);
        const pageRes = await fetch(URL);
        if (!pageRes.ok) throw new Error('Failed to fetch from WP');

        const page = await pageRes.json();
        await redis.set(URL, JSON.stringify(page), "EX", TTL);

        return res.status(200).json(page);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
