// pages/api/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
    connectTimeout: 500,       // fail faster
    retryStrategy: (times) => {
      if (times >= 3) return null; // stop retrying after 3 attempts
      return Math.min(times * 100, 1000);
    },
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url, ttl } = req.query;
    let TTL = parseInt(ttl as string);
    const URL = url as string;

    if (isNaN(TTL)) {
        TTL = 0;
    }
    
    let cached: string | null = null;

    // Try to get cache
    try {
        cached = await redis.get(URL);
    } catch (err) {
        console.warn('Redis get failed, continuing without cache.');
    }

    // Cache hit
    if (cached) {
        return res.status(200).json(JSON.parse(cached));
    }

    // If no cache, then fetch from WP and try to set cache
    try {
        // Fetch from WP
        const pageRes = await fetch(URL);
        if (!pageRes.ok) throw new Error('Failed to fetch from WP');

        const page = await pageRes.json();

        // Try to set cache
        try {
            await redis.set(URL, JSON.stringify(page), "EX", TTL);
        } catch (err) {
            console.warn('Redis set failed, continuing without cache.');
        }

        return res.status(200).json(page);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
