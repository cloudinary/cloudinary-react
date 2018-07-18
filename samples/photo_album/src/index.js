import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import PhotosListReducer from './reducers/PhotosListReducer';
import UploadedPhotosReducer from './reducers/UploadedPhotosReducer';
import Config from './config/config';

const rootReducer = combineReducers({
    photos: PhotosListReducer,
    uploadedPhotos: UploadedPhotosReducer,
});

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <AppContainer cloudName={Config.cloud_name}
                      uploadPreset={Config.upload_preset} />
    </Provider>,
    document.getElementById('root')
);
