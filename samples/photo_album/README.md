Cloudinary React Photo Album Sample
=======================================

This sample project shows:

1. How to use the Cloudinary React components.
2. How to upload files to Cloudinary in an unsigned manner, using an upload preset.
3. How to use the dynamic list resource in order to maintain a short list of resources aggregated by tags.
4. How to delete an image uploaded from the browser with an unsigned upload. You can find additional details in this [knowledge base article](https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-). Don't forget to set the `Return delete token` setting of your unsigned upload preset to `true`.

## Configuration ##

There are 2 settings you need to change for this demo to work. Copy or rename `src/config/config.js.sample` to `src/config/config.js` and edit the following:

1. **cloud_name** - Should be change to the cloud name you received when you registered for a Cloudinary account.
2. **upload_preset** - You should first "Enable unsigned uploads" in the ["Upload Settings"](https://cloudinary.com/console/settings/upload) of your Cloudinary console and assign the resulting preset name to that field. Note, you may want to tweak and modify the upload preset's parameters.
3. Additionally, in your Cloudinary console in the ["Security Settings"](https://cloudinary.com/console/settings/security) section you should uncheck the "list" item.

## Setup ##

Run `yarn` to install the required dependencies for this module.

## Running ##

Run `yarn start` to build the app and serve it using a local server.

The application is deployed at http://localhost:5000/

## Internals ##
This sample was created using [CRA](https://github.com/facebook/create-react-app).

### Sample main components ###

#### Routing ####

The application has 2 routes:

* **/photos** - Presents a list of images tagged by `myphotoalbum`
* **/photos/new** - Presents an upload control that allows uploading multiple files by a file input or drag-and-grop.
Uploads have a dynamic progress bar. In addition it displays the details of successful uploads.  

The default route is set to `/photos`.

#### Main Components ####
> Photo list
* [App.js](src/components/App.js) the application root component. Fetches the displayed list of images.  
* [PhotoList.js](src/components/PhotoList.js) displays the list of photos that was set to the state.
* [Photo.js](src/components/Photo.js) displays a single image.
* [PhotoThumbnail.js](src/components/PhotoThumbnails.js) displays the image transformations.

> Photo Upload
* [PhotosUploader.js](src/components/PhotosUploader.js) displays the upload control and lists the properties of the uploaded images once upload completes successfully.

**Important observations**:
* This implementation shows usage of both cloudinary file upload and a react upload control.
* Changes to the title field are sent in the upload request. This is meant to illustrate the possibility of attaching extra meta-data to each upload image.
* The upload control uses the `upload_preset` we configured in Configuration step. This uses the settings defined on Cloudinary side to process the uploaded file.

### Unsigned Upload ###

In order to add images to our photo album that would later be retrievable from the Cloudinary service we must select a tag which will serve as our source for the list. In this case `myphotoalbum`.
While this tag can be set in the upload preset and remain hidden from the client side, in this sample we included it in the request itself to make this sample work without further configuration steps.

### List Resource ###

Cloudinary supports a JSON list resource. 
This list represents all resources marked with a specific tag during upload (or later through other APIs).
Whenever a new resource is uploaded with a tag, or an existing resource already tagged is deleted then the list is recalculated. 
This enables you to group a list of resources which can be retrieved by a single query. The size of the list is currently limited to 100 entires.
[Learn more](http://cloudinary.com/documentation/image_transformations#client_side_resource_lists)
