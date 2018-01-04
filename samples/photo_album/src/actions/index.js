import Cloudinary from "../Cloudinary";

export const photosFetched = (photos) => ({
    type: 'PHOTOS_FETCHED',
    photos: photos
});

export const photosUploaded = (photos) => ({
    type: 'PHOTOS_UPLOADED',
    photos: photos
});

export const updateUploadedPhoto = (uploadedPhoto) => ({
    type: 'UPDATE_UPLOADED_PHOTO',
    uploadedPhoto: uploadedPhoto
});

export const deleteUploadedPhoto = (publicId) => ({
    type: 'DELETE_UPLOADED_PHOTO',
    publicId: publicId
});

export const fetchPhotos = (cloudName) => {

    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    // the version property is used for cache bust (lists are cached by the CDN for 1 minute)
    // *************************************************************************
    // Note that this practice is DISCOURAGED in production code and is here
    // for demonstration purposes only
    // *************************************************************************
    let options = {
        cloudName: cloudName,
        format: 'json',
        type: 'list',
        version: Math.ceil(new Date().getTime() / 1000)
    };

    let url = Cloudinary.url('myphotoalbum', options);

    return fetch(url)
        .then(res => res.text())
        .then(text => {
            if (text) {
                let json = JSON.parse(text);
                let photos = json.resources.sort((photo1, photo2) => {
                    return photo1.version < photo2.version
                });
                return photos;
            } else {
                return [];
            }
        });
};