export default function debounce(func, wait, immediate) {
  let timeout = null;
  let debounced =  () => {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    if(timeout){
      clearTimeout(timeout);
    }
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.cancel = ()=>{
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;

}