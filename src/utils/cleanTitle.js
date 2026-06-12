const cleanTitle = (str) => {
  const element = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") element.push(i);
  }
  if (element.length === 0) return str;
  return str.slice(0, element[0]).trim();
};

export default cleanTitle;
