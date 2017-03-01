// Originally from lodash

/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @protected
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
export default function isElement(value) {
  return value != null && value.nodeType === 1 && isObjectLike(value);
}

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}


