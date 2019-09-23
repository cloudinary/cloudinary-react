/**
 * Promisified enzyme function setProps()
 * Sets the props of given react component
 * @param component - enzyme
 * @param nextProps (Object): An object containing new props to merge in with the current props
 * @returns {Promise} that resolves to the updated component
 */
export default (component, nextProps) => {
  return new Promise(function (resolve) {
    component.setProps(nextProps, () => {
      resolve(component);
    });
  });
};
