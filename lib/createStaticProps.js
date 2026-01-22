// lib/createStaticProps.js
import { fetchSharedData } from "./fetchData";

/**
 * A Higher-Order Function (Factory) to generate standard `getStaticProps` for Next.js pages.
 * * This ensures that every page:
 * 1. Fetches essential "Shared Data" (Menus, Footer, Global Config).
 * 2. Fetches its own specific content in parallel (if provided).
 * 3. Handles errors globally to enforce "Stale-While-Revalidate" behavior.
 * @param {Function} [pageSpecificFetcher] - An optional async function that fetches data unique to this page (e.g., Homepage content, Article body). It receives the Next.js `context` object.
 * @param {number} [revalidateSeconds=30] - The ISR revalidation time in seconds. Defaults to 30s.
 * @returns {Function} A fully formed `getStaticProps` function ready for export.
 */
export function createStaticProps(
  pageSpecificFetcher = null,
  revalidateSeconds = 30
) {
  return async context => {
    try {
      /* * STEP 1: Initiate Shared Data Fetch
       * We start this immediately so it runs in parallel with the page-specific data.
       * This includes global elements like Navigation, Footer, and Site Settings.
       */
      const sharedDataPromise = fetchSharedData();

      /* * STEP 2: Initiate Page-Specific Fetch (if applicable)
       * If a fetcher is provided, we execute it passing the Next.js context (params, preview, etc).
       * If not, we simply resolve an empty object to keep the Promise structure consistent.
       */
      let pageDataPromise = Promise.resolve({});

      if (pageSpecificFetcher) {
        pageDataPromise = pageSpecificFetcher(context);
      }

      /* * STEP 3: Await Both Requests (Parallel Execution)
       * We use Promise.all to ensure we don't wait sequentially (Waterfall).
       * Both requests must succeed. If either fails, the Promise rejects.
       */
      const [sharedData, pageData] = await Promise.all([
        sharedDataPromise,
        pageDataPromise
      ]);

      /* * STEP 4: Return Combined Props
       * We merge the shared global props with the specific page props.
       * Next.js will pass this single object to the React component.
       */
      return {
        props: {
          ...sharedData,
          ...pageData
        },
        revalidate: revalidateSeconds
      };
    } catch (error) {
      /* * ERROR HANDLING STRATEGY:
       * If any API call fails (Shared or Page-specific), we log it and THROW.
       * This prevents the site from showing a blank screen or broken layout
       * during temporary API outages.
       */
      console.error(
        `[createStaticProps] Failed to generate page: ${context.resolvedUrl}`,
        error
      );
      throw error;
    }
  };
}
