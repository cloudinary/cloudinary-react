/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import CloudinaryComponent from '../CloudinaryComponent'
import { getTransformationPropTypes } from '../../Util'

/**
 * Define a transformation that is applied to the parent tag.
 */
class Transformation extends CloudinaryComponent {
  render() {
    return null
  }
}

Transformation.propTypes = getTransformationPropTypes()
Transformation.defaultProps = {}
Transformation.exposesProps = true
Transformation.displayName = 'Transformation'

export default Transformation
