/**
 * Returns the first argument that is not undefined
 * @param {...*} values a list of arguments of any type
 * @returns {*}
 * @protected
 */
export default function firstDefined(...values){
  for(let i = 0; i < values.length; i++) {
    if(values[i] !== undefined) return values[i];
  }
  return undefined;
}
