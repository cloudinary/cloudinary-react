import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

class FacebookImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { currentPublicId: this.props.publicId1 };
    }

    render() {
        return (
            <div id="posterframe" className="responsive">
                {
                    // This will render the fetched Facebook profile picture using Cloudinary according to the
                    // requested transformations.
                    // the onClick handler dynamically changes the fetched facebook profile image by setting a
                    // different value to the `currentPublicId` state property
                }
                <a onClick={this.changeImage.bind(this)}>
                    <Image
                        className="static-photo"
                        responsive
                        type="facebook"
                        width="auto"
                        crop="scale"
                        angle="20"
                        publicId={this.state.currentPublicId}
                    >
                        {
                            // example for chaining transformations
                        }
                        <Transformation effect="art:hokusai" />
                        <Transformation
                            border="3px_solid_rgb:00390b"
                            radius="20"
                        />
                    </Image>
                </a>
            </div>
        );
    }

    changeImage() {
        const newPublicId =
            this.state.currentPublicId === this.props.publicId1
                ? this.props.publicId2
                : this.props.publicId1;
        this.setState({ currentPublicId: newPublicId });
    }
}

FacebookImage.propTypes = {
    publicId1: PropTypes.string,
    publicId2: PropTypes.string,
};

export default FacebookImage;
