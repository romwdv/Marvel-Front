const extractYears = (str) => {
  const element = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(" || str[i] === ")") element.push(i);
  }
  if (element.length < 2) return str;
  let years = str.slice(element[0] + 1, element[1]);
  return !isNaN(years) ? years : "";
};

export default extractYears;
