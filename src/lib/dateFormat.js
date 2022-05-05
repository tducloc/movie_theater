export const getYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};
