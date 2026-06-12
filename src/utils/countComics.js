const countComics = (item) => {
  if (item) {
    const count = item.filter((comics) => comics);
    return count.length;
  }
};

export default countComics;
