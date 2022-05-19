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

export const desktopNavItems = [
  {
    href: "/search",
    title: "Search",
  },
  {
    href: "/top",
    title: "Top films",
  },

  {
    href: "/type/movie",
    title: "Movies",
  },

  {
    href: "/type/tv",
    title: "TV series",
  },
];

export const tabletMobileNavItems = [
  {
    href: "/",
    title: "Homepage",
  },

  {
    href: "/top",
    title: "Top films",
  },

  {
    href: "/type/movie",
    title: "Movies",
  },

  {
    href: "/type/tv",
    title: "TV series",
  },
];

export const errorActorImage =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

export const footerItems = [
  "Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất",
  " Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)",
  " Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube)",
  "Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao",
];

export const filterItems = [
  {
    label: "Genres",
  },

  {
    label: "Country",
  },

  {
    label: "Year",
  },

  {
    label: "Sort by",
  },

  {
    label: "View",
  },
];

export const filterQuery = {
  genre: "",
  country: "",
  year: "",
  sort: "",
};
