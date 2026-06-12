const cleanURL = (str) => {
  const url = str.replace(" ", "_");
  return url;
};

export default cleanURL;
