export default (array, newItem, minLength = undefined) => {
  const newArray = [...array];

  if (minLength === undefined || minLength <= newArray.length) {
    newArray.shift();
  }

  newArray.push(newItem);
  return newArray;
};
