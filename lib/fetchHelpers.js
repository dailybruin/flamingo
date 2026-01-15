/*
 * Helper function to safely parse JSON responses
 * Returns null if there was an error, otherwise
 * returns JSON
 */
export const safeJsonParse = async (response) => {
  // 1. If response is null, the fetch failed entirely (e.g. timeout)
  if (!response) {
    console.error(`API Error: Fetch failed entirely`);
    return null;
  }

  // 2. If response exists but is an HTTP error (e.g. 404, 500)
  if (!response.ok) {
    // We can now access response.url because response is not null
    console.error(`API Error: ${response.status} ${response.statusText} at ${response.url}`);
    return null;
  }

  try {
    // Check if response is HTML instead of JSON
    const text = await response.text();
    if (text.trim().startsWith('<')) {
      console.error(`Received HTML instead of JSON from ${response.url}`);
      return null;
    }

    // Finally, return JSON
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed to parse API response from ${response.url}:`, error);
    return null;
  }
};

// Helper function to safely parse array from JSON
export async function safeJsonArray(res) {
  const data = await safeJsonParse(res);
  return Array.isArray(data) ? data : [];
}

// Add timeout to fetch requests to prevent hanging
export const fetchWithTimeout = async (url, timeout_ms = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout_ms);

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      const err = new Error(`Fetch timed out after ${timeout_ms}ms: ${url}`);
      err.cause = error;
      throw err;
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
};