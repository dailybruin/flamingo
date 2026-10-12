const PHOTO_TYPES = ["center-photo", "alt-photo", "big-center-photo"];

/**
 * Turns Gallery Maker entries into carousel slides (one per photo).
 *
 * Gallery Maker stores a photo's caption either on the photo itself
 * (`description`) or, in the stream layouts, as the `article-text` entries
 * that follow it. Text before the first photo is the gallery's intro and
 * is not part of any slide.
 *
 * @param {Array} entries - `data` array from get_gallery_data.
 * @returns {Array<{img_url, caption, credits}>}
 */
export function buildSlides(entries) {
  if (!Array.isArray(entries)) return [];

  const slides = [];
  for (const entry of entries) {
    if (!entry) continue;

    if (PHOTO_TYPES.includes(entry.type) && entry.img_url) {
      slides.push({
        img_url: entry.img_url,
        caption: (entry.description ?? "").trim(),
        ownCaption: Boolean((entry.description ?? "").trim()),
        credits: (entry.credits ?? "").trim()
      });
    } else if (entry.type === "article-text" && slides.length > 0) {
      const slide = slides[slides.length - 1];
      const text = (entry.description ?? "").trim();
      if (!slide.ownCaption && text) {
        slide.caption = slide.caption ? `${slide.caption} ${text}` : text;
      }
    }
  }

  return slides.map(({ ownCaption, ...slide }) => slide);
}
