const PhotosListReducer = (photos = [], action) => {
    switch (action.type) {
        case 'PHOTOS_FETCHED':
            return action.photos;
        case 'PHOTOS_UPLOADED': {
            return [...action.photos, ...photos];
        }
        case 'DELETE_UPLOADED_PHOTO':
            const index = photos.findIndex(current => current.public_id === action.publicId);
            return [...photos.slice(0, index), ...photos.slice(index + 1)];
        default:
            return photos;
    }
};

export default PhotosListReducer;