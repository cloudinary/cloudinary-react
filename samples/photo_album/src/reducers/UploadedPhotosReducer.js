const UploadedPhotosReducer = (uploadedPhotos = [], action) => {
    switch (action.type) {
        case 'UPDATE_UPLOADED_PHOTO': {
            const newPhoto = action.uploadedPhoto;
            const index = uploadedPhotos.findIndex(current => current.id === newPhoto.id);

            return (index === -1) ?
                [newPhoto, ...uploadedPhotos] :
                uploadedPhotos.map(current => current.id === newPhoto.id ? {...current, ...newPhoto} : current);
        }
        case 'DELETE_UPLOADED_PHOTO': {
            const index = uploadedPhotos.findIndex(current => current.response.body.public_id === action.publicId);
            return [...uploadedPhotos.slice(0, index), ...uploadedPhotos.slice(index + 1)];
        }
        default:
            return uploadedPhotos;
    }
};

export default UploadedPhotosReducer;