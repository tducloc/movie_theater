import createTimeItem from "../lib/library";

export const timeItems = [createTimeItem("Day"), createTimeItem("Week")];
export const year = (function () {
  const arr = [];
  const now = new Date();
  let startYear = now.getFullYear();

  for (let i = 0; i < 8; i++) {
    const prevYear = startYear--;
    arr.push(prevYear);
  }
  arr.push(startYear);

  arr.push(-startYear);
  return arr;
})();

export const sortBy = [
  {
    id: "popularity_desc",
    name: "Popularity giảm dần",
    value: "popularity.desc",
  },
  {
    id: "popularity_asc",
    name: "Popularity tăng dần",
    value: "popularity.asc",
  },

  {
    id: "releaseDate_desc",
    name: "Release date giảm dần",
    value: "release_date.desc",
  },
  {
    id: "releaseDate_asc",
    name: "Release date tăng dần",
    value: "release_date.asc",
  },

  { id: "vote_desc", name: "Vote giảm dần", value: "vote_average.desc" },
  { id: "vote_asc", name: "Vote tăng dần", value: "vote_average.asc" },
];
