/**
 * Delay execution of func until wait milliseconds have passed since the last invocation of the returned debounced function.
 * @param {function} func the function to execute
 * @param {number} wait waiting time in milliseconds
 * @param {boolean=false} immediate if true execute func at the beginning of the wait period
 * @returns {function()} debounced function
 * @protected
 */
export default function debounce(func, wait, immediate) {
  let timeout = null;
  let debounced = () => {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    if (timeout) {
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

  debounced.cancel = ()=> {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}