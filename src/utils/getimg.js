import imgNotFound from "../assets/marvel.png";

const notFoundImg =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

const getImg = (item, size) => {
  if (!item.thumbnail || item.thumbnail.path === notFoundImg)
    return imgNotFound;
  return `${item.thumbnail.path}/${size}.${item.thumbnail.extension}`;
};

export default getImg;
