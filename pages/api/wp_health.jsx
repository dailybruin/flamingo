/*
 * WordPress liveness check.
 *
 * The endpoint and its query parameter are deliberate: this exact path is
 * configured upstream to bypass caching, so every check reaches WordPress.
 * Do NOT add a timestamp or random cache-buster here — unique URLs against a
 * cached endpoint accumulate server-side without bound.
 *
 * Check the internal ops notes before changing the endpoint or the parameter.
 */
import { Config } from "../../config";

export default async function handler(req, res) {
  /* Number of ms before we timeout our check */
  const NUM_MS_TIMEOUT = 5000;

  /* Path is configured upstream to bypass caching — see note at top of file. */
  const CHECK_ENDPOINT = `/wp-json/menus/v1/menus/masthead?dbhealth=1`;

  // No-cache headers on OUR response (not the upstream request)
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), NUM_MS_TIMEOUT);

  try {
    const wpRes = await fetch(`${Config.apiUrl}${CHECK_ENDPOINT}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!wpRes.ok) {
      return res.status(503).json({
        status: "degraded",
        wordpress: "down",
        code: wpRes.status
      });
    }

    const menu = await wpRes.json();

    /* fetchMastheadCategories() treats an empty menu as fatal; match that. */
    if (!menu?.items?.length) {
      return res.status(503).json({
        status: "degraded",
        wordpress: "empty",
        error: "Masthead menu returned no items"
      });
    }

    return res.status(200).json({
      status: "ok",
      wordpress: "up",
      menuItems: menu.items.length,
      checkedAt: new Date().toISOString()
    });
  } catch (error) {
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
