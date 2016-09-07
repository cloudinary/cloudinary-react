export default function firstDefined(...values){
  for(let value of values) {
    if(value !== undefined) return value;
  }
  return undefined;
}
