const { createClient } = require('redis');

const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

// Ensure Redis client connects only once
client.connect()
    .then(() => console.log('Redis Running.'))
    .catch((err: any) => console.error('Redis Connection Error:', err));

async function fetch_cache(uri: string) {
    try {
        // Check if cache exists for URI
        const cacheValue = await client.get(uri);

        if ( cacheValue ) {
            // Return cache as JSON
            console.log('Cache Hit:', cacheValue);
            return JSON.parse(uri);
        }

        // No hit - get JSON from URI
        const res = await fetch(uri);
        const json = await res.json();

        // Set new cache with time to live
        await client.set(uri, JSON.stringify(json), {
            EX: 10  // Time to live (sec)
        });
        
        // Return JSON to user
        return json;

    } catch (err) {
        console.error(err);

        // If Redis fails, still return fetched data
        try {
            const res = await fetch(uri);
            return await res.json();
        } catch (fetchErr) {
            console.error('Fetch Error:', fetchErr);
            throw fetchErr;
        }

    }
}

// Close Redis on process exit
const shutdown = async () => {
    if (client.isOpen) {
        await client.disconnect();
        console.log('Redis Disconnected.');
    }
};

process.on('SIGINT', shutdown);  // Handle Ctrl+C
process.on('exit', shutdown);    // Handle normal exit

module.exports = { fetch_cache };

// Example call:
//fetch_cache('https://wp.dailybruin.com/wp-json/wp/v2/pages/131445');
