/**
 * Jedno zapytanie landingu (DatoCMS Content Delivery API / GraphQL).
 *
 * Nazwy pól zgodne z dokumentacją: identyfikator API modelu → zapytanie główne.
 * - Kolekcja: `team` → allTeams (liczba mnoga po angielsku).
 * - Singleton: nazwa pola = identyfikator API modelu w GraphQL (np. ten projekt: `ourstory`).
 *
 * Jeśli dostajesz „Field doesn't exist on type Query”, sprawdź w Dato:
 * Settings → API Explorer — dokładne nazwy pól głównych (Query).
 *
 * @see https://www.datocms.com/docs/content-delivery-api/how-to-fetch-records
 */
export const LANDING_PAGE_QUERY = `query LandingPage {
  allTeams(orderBy: _publishedAt_ASC) {
    booksy
    description
    id
    image {
      url
    }
    instagram
    job
    name
  }
  _allTeamsMeta {
    count
  }
  ourstory {
    id
    header
    secondSentence
    description
    footer
    video {
      id
      url
    }
  }
  gallery {
    id
    gallery {
      url
    }
    priority
    preview {
      url
    }
  }
}`;
