import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AppContainer from './components/App';
import PhotosListReducer from './reducers/PhotosListReducer';
import UploadedPhotosReducer from './reducers/UploadedPhotosReducer';

const rootReducer = combineReducers({
    photos: PhotosListReducer,
    uploadedPhotos: UploadedPhotosReducer,
});

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <AppContainer cloudName="danashalev" uploadPreset="hvs8orho" />
    </Provider>,
    document.getElementById('root')
);
