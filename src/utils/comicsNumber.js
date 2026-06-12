const extractComicsNumber = (str) => {
  if (!str) return "";
  const comicsNumber = str.match(/#\d+/);
  return comicsNumber ? `/ ${comicsNumber[0]}` : "";
};

export default extractComicsNumber;
