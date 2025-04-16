// pages/api/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { Config } from '../../config.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const CACHE_KEY = `wp_page_${id}`;
    const TTL = 60; // cache for 60 seconds
    const redis = new Redis("localhost:6379")

    try {
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            return res.status(200).json(JSON.parse(cached));
        }

        const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/${id}`);
        if (!pageRes.ok) throw new Error('Failed to fetch from WP');

        const page = await pageRes.json();
        await redis.set(CACHE_KEY, JSON.stringify(page));

        return res.status(200).json(page);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
