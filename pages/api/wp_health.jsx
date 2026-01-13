import { Config } from "../../config";

export default async function handler(req, res) {
  /* Number of ms before we timeout our check */
  const NUM_MS_TIMEOUT = 5000;

  /* 
   * The endpoint to check if WP is healthy. Note that we append
   * a unique cb query parameter to ensure this URL is not cached
   */
  const CHECK_ENDPOINT = `/wp-json/wp/v2/posts?per_page=1&cb=${Date.now()}`;

  // 1. Standard No-Cache Headers
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // 2. Setup Timeout Logic
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), NUM_MS_TIMEOUT);

  try {
    const wpRes = await fetch(`${Config.apiUrl}${CHECK_ENDPOINT}`, {
      signal: controller.signal,
      headers: {
        "Cache-Control": "no-cache"
      }
    });

    clearTimeout(timeoutId); // Request finished, clear the timer

    if (!wpRes.ok) {
      return res.status(503).json({
        status: "degraded",
        wordpress: "down",
        code: wpRes.status
      });
    }

    const posts = await wpRes.json();
    const latestPostDate = posts?.[0]?.date ?? null;

    return res.status(200).json({
      status: "ok",
      wordpress: "up",
      latestPostDate,
      checkedAt: new Date().toISOString()
    });
  } catch (error) {
    // Distinguish between a timeout and other network errors
    const isTimeout = error.name === "AbortError";

    return res.status(503).json({
      status: "down",
      wordpress: isTimeout ? "timeout" : "unreachable",
      error: isTimeout
        ? "WordPress took too long to respond"
        : "Connection failed"
    });
  }
}
