import standard_medium from "../assets/marvel.png";
import standard_fantastic from "../assets/marvelsq250.png";
import portrait_uncanny from "../assets/portrait_uncanny.png";

const notFoundImg =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

const getImg = (item, size = "standard_medium") => {
  if (!item.thumbnail || item.thumbnail.path === notFoundImg) {
    switch (size) {
      case "standard_fantastic":
        return standard_fantastic;
      case "portrait_uncanny":
        return portrait_uncanny;
      default:
        return standard_medium;
    }
  }
  return `${item.thumbnail.path}/${size}.${item.thumbnail.extension}`;
};

export default getImg;
