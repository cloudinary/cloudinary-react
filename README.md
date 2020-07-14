
# Cloudinary React Library

Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline.

Easily upload images to the cloud. Automatically perform smart image resizing, cropping and conversion without installing any complex software. Integrate Facebook or Twitter profile image extraction in a snap, in any dimension and style to match your website’s graphics requirements. Images are seamlessly delivered through a fast CDN, and much much more.

Cloudinary offers comprehensive APIs and administration capabilities and is easy to integrate with any web application, existing or new.

Cloudinary provides URL and HTTP based APIs that can be easily integrated with any Web development framework.

## Installation


### NPM

1. Install the files using the following command. Use the optional `--save` parameter if you wish to save the dependency in your `bower.json` file.

   ```shell
   npm install cloudinary-react --save
   ```

1. Include the javascript files in your code. For Example:
   
   ```js
   import {Image} from 'cloudinary-react';
   ```


## Setup

In order to properly use this library you have to provide it with a few configuration parameters. All configuration parameters can be applied directly to the element or using a CloudinaryContext element.


```js
ReactDOM.render(
            <div>
                <h1>Hello, world!</h1>
                <Image cloudName="demo" publicId="sample" width="300" crop="scale"/>
                // Or for more advanced usage:
                // import {CloudinaryContext, Transformation} from 'cloudinary-react';
                <CloudinaryContext cloudName="demo">
                    <Image publicId="sample">
                        <Transformation width="200" crop="scale" angle="10"/>
                    </Image>
                </CloudinaryContext>
            </div>,
            document.getElementById('example')
    );
```

Required:

* `cloudName` - The cloudinary cloud name associated with your Cloudinary account.

Optional:

* `privateCdn`, `secureDistribution`, `cname`, `cdnSubdomain` - Please refer to [Cloudinary Documentation](https://cloudinary.com/documentation/react_integration#3_set_cloudinary_configuration_parameters) for information on these parameters.


## Usage

The library includes 6 Components:

* CloudinaryContext
* Image
* Audio
* Video
* Transformation
* Placeholder - can only be used as child of an Image component

## Components Demo
Storybook for the components is available [here](https://cloudinary.github.io/cloudinary-react/)

### CloudinaryContext
CloudinaryContext allows you to define shared parameters that are applied to all children elements.

### Image
The Image element defines a Cloudinary Image tag.
 
### Video
The Video element defines a Cloudinary Video tag.

### Transformation
The Transformation element allows you to defined additional transformations on the parent element.

For example:

```
<Image cloudName="demo" publicId="sample">
    <Transformation angle="-45"/>
    <Transformation effect="trim" angle="45" crop="scale" width="600">
      <Transformation overlay="text:Arial_100:Hello" />
    </Transformation>
</Image>
```


The Cloudinary Documentation can be found at:
http://cloudinary.com/documentation

## Additional resources

Additional resources are available at:

* [Website](http://cloudinary.com)
* [Documentation](http://cloudinary.com/documentation)
* [Knowledge Base](http://support.cloudinary.com/forums)
* [Image transformations documentation](http://cloudinary.com/documentation/image_transformations)

## Support

You can [open an issue through GitHub](https://github.com/cloudinary/cloudinary_js/issues).

Contact us at [http://cloudinary.com/contact](http://cloudinary.com/contact).

Stay tuned for updates, tips and tutorials: [Blog](http://cloudinary.com/blog), [Twitter](https://twitter.com/cloudinary), [Facebook](http://www.facebook.com/Cloudinary).

## Join the Community ##########################################################

Impact the product, hear updates, test drive new features and more! Join [here](https://www.facebook.com/groups/CloudinaryCommunity).

## Updating github pages
The github pages source is the "gh-pages" branch. To generate updated storybook:
1. Switch to "gh-pages" branch
2. pull from master
3. rebuild storybook by running "npm run build-storybook"
4. commit and push

## License

Released under the MIT license.
