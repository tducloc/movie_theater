export default {
  // Film detail
  getFilmDetailUrl: (media_type, id) =>
    `${process.env.REACT_APP_API_URL}/${media_type}/${id}`,

  // Season Detail
  getSeasonDetailUrl: (media_type, id, season_id) => {
    if (media_type === "tv" && season_id)
      return `${process.env.REACT_APP_API_URL}/${media_type}/${id}/season/${season_id}`;
    else return null;
  },

  // Trailer of film

  getTrailerOfFilmUrl: (media_type, id) =>
    `${process.env.REACT_APP_API_URL}/${media_type}/${id}/videos`,

  // Similar movie
  getSimilarFilmUrl: (media_type, id) => {
    if (media_type === "movie")
      return `${process.env.REACT_APP_API_URL}/${media_type}/${id}/similar`;
    else return null;
  },

  // Crew and cast of film

  getCastOfFilmUrl: (media_type, id) =>
    `${process.env.REACT_APP_API_URL}/${media_type}/${id}/credits`,

  // Watch film url
  watchFilmUrl: (media_type, id, season_id = 1, episode_id = 1) => {
    let uri = `/watch/${media_type}/${id}`;
    if (media_type === "movie") return uri;

    if (media_type === "tv") {
      if (season_id) return `${uri}?season=${season_id}&episode=1`;
      else return `${uri}?season=${1}&episode=1`;
    }
  },

  getSearchFilmUrl: (media_type) => {
    return `${process.env.REACT_APP_API_URL}/search/${media_type}`;
  },
};