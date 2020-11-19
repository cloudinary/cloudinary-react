import { Transformation, Util } from 'cloudinary-core'
import PropTypes from 'prop-types'
// props passed to cloudinary-core but should not be rendered as dom attributes
const CLOUDINARY_REACT_PROPS = [
  'accessibility',
  'breakpoints',
  'dataSrc',
  'placeholder',
  'publicId',
  'signature',
  'responsiveDebounce'
]

// props passed to cloudinary-core for dom elements attributes generation
// Map Cloudinary props from array to object for efficient lookup
const CLOUDINARY_PROPS = [
  ...Transformation.PARAM_NAMES,
  ...CLOUDINARY_REACT_PROPS
]
  .map(Util.camelCase)
  .reduce((accumulator, cloudinaryPropName) => {
    accumulator[cloudinaryPropName] = true
    return accumulator
  }, {})

/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props
 *
 * @param props
 * @returns {{children: *, cloudinaryReactProps: {}, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */
const extractCloudinaryProps = (props) => {
  const { children, ...rest } = props

  const result = {
    children,
    cloudinaryProps: {},
    nonCloudinaryProps: {},
    cloudinaryReactProps: {}
  }

  Object.keys(rest).forEach((key) => {
    const camelKey = Util.camelCase(key)
    const value = rest[key]

    // if valid and defined add to cloudinaryProps
    if (CLOUDINARY_PROPS[camelKey]) {
      if (rest[key] !== undefined && rest[key] !== null) {
        result.cloudinaryProps[camelKey] = value
      }
    } else if (camelKey === 'includeOwnBody') {
      // cloudinary-react specific prop
      result.cloudinaryReactProps[camelKey] = value
    } else {
      // not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = value
    }
  })

  return result
}

/**
 * Create a React type definition object. All items are PropTypes.string or [string] or object or [object].
 * @param {Array} configParams a list of parameter names
 * @returns {Object}
 * @private
 */
const typesFrom = (configParams) => {
  configParams = configParams || []
  const types = {}
  for (let i = 0; i < configParams.length; i++) {
    const key = configParams[i]
    types[Util.camelCase(key)] = PropTypes.any
  }
  return types
}

const getTransformationPropTypes = () =>
  typesFrom(Transformation.PARAM_NAMES.map(Util.camelCase))

export {
  CLOUDINARY_REACT_PROPS,
  extractCloudinaryProps,
  getTransformationPropTypes
}
