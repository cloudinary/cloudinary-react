/**
 * Returns the first argument that is not undefined
 * @param {...*} values a list of arguments of any type
 * @returns {*}
 */
export default function firstDefined(...values){
  for(let value of values) {
    if(value !== undefined) return value;
  }
  return undefined;
}
