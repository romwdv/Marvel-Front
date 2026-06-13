const extractComicsNumber = (str, sep = "") => {
  if (!str) return "";
  const comicsNumber = str.match(/#\d+/);
  return comicsNumber ? `${sep} ${comicsNumber[0]}` : "";
};

export default extractComicsNumber;
