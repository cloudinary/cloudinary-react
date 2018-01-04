import {Cloudinary as CoreCloudinary, Util} from 'cloudinary-core';

export default class Cloudinary {

    static url(publicId, options) {
        let scOptions = Util.withSnakeCaseKeys(options);
        let cl = CoreCloudinary.new();
        return cl.url(publicId, scOptions);
    }

    static openUploadWidget(options, callback) {
        let scOptions = Util.withSnakeCaseKeys(options);
        window.cloudinary.openUploadWidget(scOptions, callback);
    }
}