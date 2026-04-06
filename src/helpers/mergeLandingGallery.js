/**
 * Podmienia `src` w szablonie bento kolejnymi URL z rekordu `gallery` z Dato.
 * Gdy `gallery` jest puste, a jest `preview.url` — używa go tylko dla pierwszego kafelka.
 */
export function mergeLandingBento(staticItems, galleryRecord) {
  if (!galleryRecord || typeof galleryRecord !== "object") {
    return staticItems;
  }

  let urls = (Array.isArray(galleryRecord.gallery) ? galleryRecord.gallery : [])
    .map((g) => g?.url)
    .filter((u) => typeof u === "string" && u.trim() !== "");

  if (urls.length === 0 && galleryRecord.preview?.url) {
    const p = String(galleryRecord.preview.url).trim();
    if (p) urls = [p];
  }

  return staticItems.map((item, i) => {
    const remote = urls[i];
    if (!remote) return item;
    return { ...item, src: remote, fromCms: true };
  });
}
