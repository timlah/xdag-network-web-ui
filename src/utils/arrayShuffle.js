/**
 * Shuffles array in place.
 * @param {Array} arr items An array containing items.
 */
export default arr => {
  const newArr = arr;

  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    const currentItem = newArr[i];
    newArr[i] = newArr[randIndex];
    newArr[randIndex] = currentItem;
  }

  return newArr;
};
