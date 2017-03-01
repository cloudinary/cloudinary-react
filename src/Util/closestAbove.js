/**
 * Returns the first item in list that is greater or equal to the given value.
 * @param {Array} list a sorted array of items
 * @param {*} value
 * @returns {*}
 * @protected
 */
export default function closestAbove(list, value) {
  return list.reduce((last, next) => value <= last ? last : next, undefined);
}
