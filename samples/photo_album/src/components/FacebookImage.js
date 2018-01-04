import React, {Component} from 'react';
import {Transformation} from 'cloudinary-react';
// TODO: change import after the 'equals' bug is fixed
import Image from '../../../../src/components/Image';

class FacebookImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {currentPublicId: this.props.publicId1};
    }

    render() {
        return (
            <div id='posterframe' className='responsive'>
                {
                    // This will render the fetched Facebook profile picture using Cloudinary according to the
                    // requested transformations. This also shows how to chain transformations
                }
                <a onClick={this.changeImage.bind(this)}>
                    <Image className='static-photo'
                           responsive
                           type='facebook'
                           width='auto'
                           crop='scale'
                           angle='20'
                           publicId={this.state.currentPublicId}>
                        <Transformation effect='art:hokusai'/>
                        <Transformation border='3px_solid_rgb:00390b' radius='20'/>
                    </Image>
                </a>
            </div>
        );
    };

    changeImage() {
        const newPublicId = (this.state.currentPublicId === this.props.publicId1) ? this.props.publicId2 : this.props.publicId1;
        this.setState({currentPublicId: newPublicId});
    }
}

export default FacebookImage;