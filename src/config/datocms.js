/**
 * DatoCMS GraphQL (Content Delivery API) — ten sam endpoint co w dokumentacji:
 * https://www.datocms.com/docs/content-delivery-api
 *
 * Token read-only: w dokumentacji bywa `process.env.DATOCMS_READONLY_TOKEN`.
 * Create React App wstrzykuje do kodu w przeglądarce WYŁĄCZNIE zmienne
 * z prefiksem REACT_APP_ — ustaw np. REACT_APP_DATOCMS_READONLY_TOKEN w .env
 * (bez tego prefiksu token w kliencie będzie zawsze undefined).
 */
export const DATOCMS_GRAPHQL_ENDPOINT = "https://graphql.datocms.com/";

function getDatocmsToken() {
  return (
    process.env.REACT_APP_DATOCMS_READONLY_TOKEN?.trim() ||
    process.env.REACT_APP_DATOCMS_TOKEN?.trim() ||
    process.env.REACT_APP_TOKEN?.trim() ||
    ""
  );
}

/**
 * Która zmienna środowiskowa dostarczyła token (kolejność: najpierw read-only z dokumentacji Dato).
 * Do console.log w dev — nie loguj wartości tokenu.
 */
export function getDatocmsTokenSourceLabel() {
  if (process.env.REACT_APP_DATOCMS_READONLY_TOKEN?.trim()) {
    return "REACT_APP_DATOCMS_READONLY_TOKEN (read-only, zalecane)";
  }
  if (process.env.REACT_APP_DATOCMS_TOKEN?.trim()) {
    return "REACT_APP_DATOCMS_TOKEN";
  }
  if (process.env.REACT_APP_TOKEN?.trim()) {
    return "REACT_APP_TOKEN (legacy)";
  }
  return null;
}

/** Czy skonfigurowano token (np. do logów diagnostycznych). */
export function hasDatocmsToken() {
  return Boolean(getDatocmsToken());
}

export function getDatocmsHeaders() {
  const token = getDatocmsToken();
  if (process.env.NODE_ENV === "development" && !token) {
    // eslint-disable-next-line no-console
    console.warn(
      "[DatoCMS] Brak tokenu. W .env ustaw REACT_APP_DATOCMS_READONLY_TOKEN lub REACT_APP_DATOCMS_TOKEN (read-only z Dato → Project settings → API tokens). CRA wymaga prefiksu REACT_APP_. Wzorzec: .env.example."
    );
  }
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}
