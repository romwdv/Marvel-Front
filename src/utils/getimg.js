import standard_medium from "../assets/marvel.png";
import standard_fantastic from "../assets/marvelsq250.png";
import portrait_uncanny from "../assets/portrait_uncanny.png";

const notFoundImg =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

const getImg = (item, size) => {
  let imgNotFound = "";

  switch (size) {
    case "standard_medium":
      imgNotFound = standard_medium;
      break;
    case "standard_fantastic":
      imgNotFound = standard_fantastic;
      break;
    case "portrait_uncanny":
      imgNotFound = portrait_uncanny;
      break;
    default:
      imgNotFound = standard_medium;
      break;
  }

  if (!item.thumbnail || item.thumbnail.path === notFoundImg)
    return imgNotFound;
  return `${item.thumbnail.path}/${size}.${item.thumbnail.extension}`;
};

export default getImg;
