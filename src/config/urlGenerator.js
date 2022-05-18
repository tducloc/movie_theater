const generator = {
  // Film detail
  getFilmDetailUrl: (mediaType, id) =>
    `${process.env.REACT_APP_API_URL}/${mediaType}/${id}`,

  // Season Detail
  getSeasonDetailUrl: (mediaType, id, season_id) => {
    if (mediaType === "tv" && season_id)
      return `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/season/${season_id}`;
    else return null;
  },

  // Trailer of film

  getTrailerOfFilmUrl: (mediaType, id) =>
    `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/videos`,

  // Similar movie
  getSimilarFilmUrl: (mediaType, id) => {
    if (mediaType === "movie")
      return `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/similar`;
    else return null;
  },

  // Crew and cast of film

  getCastOfFilmUrl: (mediaType, id) =>
    `${process.env.REACT_APP_API_URL}/${mediaType}/${id}/credits`,

  // Watch film url
  watchFilmUrl: (mediaType, id, season_id = 1, episode_id = 1) => {
    let uri = `/watch/${mediaType}/${id}`;
    if (mediaType === "movie") return uri;

    if (mediaType === "tv") {
      if (season_id) return `${uri}?season=${season_id}&episode=1`;
      else return `${uri}?season=${1}&episode=1`;
    }
  },

  getSearchFilmUrl: (mediaType) => {
    return `${process.env.REACT_APP_API_URL}/search/${mediaType}`;
  },

  getAllCountriesUrl: () => {
    return `${process.env.REACT_APP_API_URL}/configuration/languages`;
  },

  getGenresUrl: (mediaType) => {
    return `${process.env.REACT_APP_API_URL}/genre/${mediaType}/list`;
  },

  getDiscoverUrl: (mediaType) => {
    return `${process.env.REACT_APP_API_URL}/discover/${mediaType}`;
  },

  getPosterUrl: (url) => {
    return url
      ? process.env.REACT_APP_API_IMAGE_PATH + url
      : "https://i.pinimg.com/originals/fd/2d/9f/fd2d9f4640394679d65967c13ec0de2c.jpg";
  },

  getTrendingUrl: (mediaType, time) => {
    return `${process.env.REACT_APP_API_URL}/trending/${mediaType}/${time}`;
  },

  getImageUrl: (path) => {
    return `${process.env.REACT_APP_API_IMAGE_PATH}/${path}`;
  },
};

export default generator;
