import React, {Component} from 'react';
import Cloudinary from '../Cloudinary';
import Photo from './Photo';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {photosUploaded} from '../actions';
import FacebookImage from './FacebookImage';
import Introduction from './Introduction';
import {NavLink} from 'react-router-dom';

class PhotoList extends Component {

    render() {
        return (
            <div className='photoList'>
                <FacebookImage publicId1='billclinton' publicId2='officialchucknorrispage'/>
                <Introduction/>
                <h1>Your Photos</h1>
                <div className='actions'>
                    <a className='upload_link' onClick={this.uploadImageWithCloudinary.bind(this)}>Add photos with
                        Cloudinary File upload</a>
                </div>
                <div className='actions'>
                    <NavLink className='upload_link' exact to="/photos/new">Add photo with React File upload</NavLink>
                </div>
                <div className='photos'>
                    {this.props.photos.length === 0 && <p>No photos were added yet.</p>}
                    {
                        this.props.photos.map(photo => {
                                return (
                                    <Photo key={photo.public_id}
                                           publicId={photo.public_id}>
                                    </Photo>
                                );
                            }
                        )
                    }
                </div>
                <div className='note'>
                    Take a look at our documentation of <a
                    href='http://cloudinary.com/documentation/image_transformations'
                    target='_blank'>Image Transformations</a> for a full list of supported transformations.
                </div>
            </div>
        );
    }

    uploadImageWithCloudinary() {
        let uploadOptions = {tags: 'myphotoalbum', ...this.context};
        Cloudinary.openUploadWidget(
            uploadOptions,
            (error, photos) => {
                this.props.onPhotosUploaded(photos);
            }
        );
    }
}

PhotoList.contextTypes = {cloudName: PropTypes.string, uploadPreset: PropTypes.string};

const PhotoListContainer = connect(
    state => state,
    {
        onPhotosUploaded: photosUploaded
    })(PhotoList);

Object.assign(PhotoListContainer.contextTypes, PhotoList.contextTypes);

export default PhotoListContainer;