import React, {Component} from 'react';
import PropTypes from 'prop-types';
// TODO: change import after the 'equals' bug is fixed
import Image from '../../../../src/components/Image';
import {Transformation} from 'cloudinary-react';
import PhotoThumbnails from "./PhotoThumbnails";
import Cloudinary from "../Cloudinary";

class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {showMore: false};
    }

    render() {
        let options = {...this.context, ...this.props};
        let url = Cloudinary.url(options.publicId, options);

        return (
            <div className="photo">
                {
                    this.props.context && <h2>{this.props.context.custom.photo}</h2>
                }
                <a href={url} format="jpg" target="_blank">
                    <Image publicId={this.props.publicId}
                           className="thumbnail inline"
                           width="150"
                           height="150"
                           crop="fit"
                           quality="80"
                           format="jpg">
                        <Transformation quality="auto" fetchFormat="auto"/>
                    </Image>
                </a>
                {
                    !this.state.showMore &&
                    <div className="less_info">
                        <button className="toggle_info"
                                style={{cursor: 'help'}}
                                onClick={this.showMore.bind(this)}>
                            Show transformations
                        </button>
                    </div>
                }

                {
                    this.state.showMore &&
                    <div className="more_info">
                        <button className="toggle_info"
                                onClick={this.showLess.bind(this)}>
                            Hide transformations
                        </button>
                        <PhotoThumbnails publicId={this.props.publicId}/>
                    </div>
                }
            </div>
        );
    }

    showMore() {
        this.setState({showMore: true});
    }

    showLess() {
        this.setState({showMore: false});
    }
}

Photo.contextTypes = {cloudName: PropTypes.string, uploadPreset: PropTypes.string};

export default Photo;