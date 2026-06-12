const reduceParagraph = (p) => {
  let newStr = "";
  const copyStr = p.split(" ");
  if (copyStr.length > 20) {
    for (let word = 0; word < 20; word++) {
      newStr += copyStr[word] + " ";
      for (let i = 0; i <= 1; i++) {
        newStr += "";
      }
    }
    newStr += "...(read more)";
    return newStr;
  } else {
    return p;
  }
};

export default reduceParagraph;
