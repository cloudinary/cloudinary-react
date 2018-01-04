import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {CloudinaryContext} from 'cloudinary-react';
// TODO: change import after the 'equals' bug is fixed
import Image from '../../../../src/components/Image';
import PhotoListContainer from './PhotoList';
import PhotosUploaderContainer from './PhotosUploader';
import {fetchPhotos, photosFetched} from "../actions";
import '../app.css';

class App extends Component {

    componentDidMount() {
        fetchPhotos(this.props.cloudName).then(this.props.onPhotosFetched);
    }

    render() {
        return (
            <CloudinaryContext cloudName={this.props.cloudName} uploadPreset={this.props.uploadPreset}>
                <Image type='fetch'
                       publicId='http://cloudinary.com/images/logo.png'
                       fetch-format='auto'
                       quality='auto'>
                </Image>
                <BrowserRouter>
                    <Switch className='router'>
                        <Route exact path='/photos' component={PhotoListContainer}/>
                        <Route exact path='/photos/new' component={PhotosUploaderContainer}/>
                        <Redirect from='/' to='/photos'/>
                    </Switch>
                </BrowserRouter>
            </CloudinaryContext>
        );
    }
}

App.contextTypes = {cloudName: PropTypes.string, uploadPreset: PropTypes.string};

const AppContainer = connect(() => {}, {onPhotosFetched: photosFetched})(App);
Object.assign(AppContainer.contextTypes, App.contextTypes);

export default AppContainer;
