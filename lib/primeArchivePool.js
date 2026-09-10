import archiveData from "./primeArchiveData.json";

/*
 * The pool "The Latest" draws from, and the weekly pick.
 *
 * Split out from lib/primeArchive.js because the JSON is ~160 KB. Load it with
 * await import() from getInitialProps so Next code-splits it into a chunk that
 * only downloads when someone actually opens the PRIME category. Importing it
 * statically anywhere puts it in the shared category bundle.
 *
 * Two kinds of story were dropped at generation time: those with no excerpt to
 * show, and those whose cover image is on plain http:// -- the browser blocks
 * that as mixed content on an https:// page and the card renders empty. 220 of
 * 235 survive; see lib/primeArchiveData.json "excluded".
 */

export const primeArchivePool = archiveData.articles;
export const primeArchiveCounts = archiveData.counts;

/*
 * ISO-8601 week number. Weeks start Monday, and week 1 is the one holding the
 * first Thursday of the year.
 */
function isoWeekKey(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Shift to the Thursday of this week, which always sits in the owning year.
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return d.getUTCFullYear() * 100 + week;
}

/*
 * The stories shown in "The Latest", rotating once a week.
 *
 * Derived from the ISO week rather than randomised, for two reasons: the choice
 * has to be identical on every pod, and it has to be identical on the server and
 * in the browser. A Math.random() pick would differ across the hydration boundary
 * and blank the block -- that exact bug broke PRIME's own homepage during the
 * port (PRILUSBY 5620fee).
 *
 * Call this from getInitialProps and pass the result down. Calling it during
 * render would read the clock twice, and a pod on UTC can be in a different week
 * than a reader in Los Angeles for a few hours every Sunday night.
 */
export function getWeeklyPicks(count = 2, date = new Date()) {
  const pool = primeArchivePool;
  if (!pool || pool.length === 0) return [];

  const week = isoWeekKey(date);
  const take = Math.min(count, pool.length);

  // Step by `take` so consecutive weeks show a fresh pair rather than sliding by
  // one and repeating a story from last week.
  const start = (Math.abs(week) * take) % pool.length;

  const picks = [];
  for (let i = 0; i < take; i++) {
    picks.push(pool[(start + i) % pool.length]);
  }
  return picks;
}
