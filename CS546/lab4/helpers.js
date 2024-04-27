// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export let isValidDate = (dateString) => {
  const [month, day, year] = dateString.split("/").map(Number);

  if (
    year < 100 ||
    year > 2024 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
