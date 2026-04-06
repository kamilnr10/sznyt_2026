/**
 * Atrybuty data-* do mapowania plików DatoCMS → miejsce w UI (DevTools, skrypty, eksport).
 * Nie wpływają na wygląd strony.
 */
export function datoFileDataProps(file, extra = {}) {
  const out = { ...extra };
  if (!file) return out;
  if (file.id) out["data-cms-asset-id"] = file.id;
  if (file.basename) out["data-cms-basename"] = file.basename;
  if (file.title) out["data-cms-title"] = file.title;
  return out;
}
