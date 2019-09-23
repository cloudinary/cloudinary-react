export default (props, cloudinaryProps) => {
  return Object.keys(props)
    .filter(propName => !cloudinaryProps[propName])
    .reduce((allowedProps, currentProp) => {
      allowedProps[currentProp] = props[currentProp];
      return allowedProps;
    }, {});
};
