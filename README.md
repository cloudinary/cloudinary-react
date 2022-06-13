Cloudinary React SDK
=========================
## About
**NOTE-IMPORTANT**: This is a legacy package, please find latest at https://github.com/cloudinary/frontend-frameworks/tree/master/packages/react

The Cloudinary React SDK allows you to quickly and easily integrate your application with Cloudinary.
Effortlessly optimize and transform your cloud's assets.

#### Note
This Readme provides basic installation and usage information.
For the complete documentation, see the [React SDK Guide](https://cloudinary.com/documentation/react1_integration).


## Table of Contents
- [Key Features](#key-features)
- [Version Support](#Version-Support)
- [Installation](#installation)
- [Usage](#usage)
    - [Setup](#Setup)
    - [Transform and Optimize Assets](#Transform-and-Optimize-Assets)
    - [Generate Image and HTML Tags](#Generate-Image-and-Video-HTML-Tags)

## Key Features
- [Transform](https://cloudinary.com/documentation/react1_video_manipulation#video_transformation_examples) and [optimize](https://cloudinary.com/documentation/react1_image_manipulation#image_optimizations) assets.
- Generate [image](https://cloudinary.com/documentation/react1_image_manipulation#deliver_and_transform_images) and [video](https://cloudinary.com/documentation/react1_video_manipulation#video_element) tags.

## Version Support
| SDK Version   | React 15.3 | React 16.2 | React 16.3 | React 17 | React 18 |
|---------------|------------|------------|------------|----------|----------|
| 1.6.8 & up    | X          | X          | V          | V        | V        |
| 1.2.0 - 1.6.7 | X          | X          | V          | X        | X        |
| 1.0.5 - 1.1.4 | X          | V          | X          | X        | X        |
| 1.0.0 - 1.0.4 | V          | X          | X          | X        | X        |

## Installation
### Install using your favorite package manager (yarn, npm)
```bash
npm install cloudinary-react
```
Or
```bash
yarn add cloudinary-react
```

## Usage
### Setup
```javascript
import React from 'react';
import {Image, Video, Transformation} from 'cloudinary-react';
```

### Transform and Optimize Assets
- [See full documentation](https://cloudinary.com/documentation/react1_image_manipulation)

   ```jsx
    // Apply a single transformation
    <Image cloudName="demo" publicId="sample">
      <Transformation crop="scale" width="200" angle="10" />
    </Image>
    ```

    ```jsx
    // Chain (compose) multiple transformations
    <Image cloudName="demo" publicId="sample">
          <Transformation angle="-45" />
          <Transformation effect="trim" angle="45" crop="scale" width="600" />
          <Transformation overlay="text:Arial_100:Hello" />
    </Image>
    ```
### Generate Image and Video HTML Tags
    - Use <Image> to generate image tags
    - Use <Video> to generate video tags

### File upload
This SDK does not provide file upload functionality, however there are [several methods of uploading from the client side](https://cloudinary.com/documentation/react1_image_and_video_upload).

## Contributions
- Ensure tests run locally (```npm run test```)
- Open a PR and ensure Travis tests pass

## Get Help
If you run into an issue or have a question, you can either:
- [Open a Github issue](https://github.com/CloudinaryLtd/cloudinary-react/issues)  (for issues related to the SDK)
- [Open a support ticket](https://cloudinary.com/contact) (for issues related to your account)

## About Cloudinary
Cloudinary is a powerful media API for websites and mobile apps alike, Cloudinary enables developers to efficiently manage, transform, optimize, and deliver images and videos through multiple CDNs. Ultimately, viewers enjoy responsive and personalized visual-media experiences—irrespective of the viewing device.


## Additional Resources
- [Cloudinary Transformation and REST API References](https://cloudinary.com/documentation/cloudinary_references): Comprehensive references, including syntax and examples for all SDKs.
- [MediaJams.dev](https://mediajams.dev/): Bite-size use-case tutorials written by and for Cloudinary Developers
- [DevJams](https://www.youtube.com/playlist?list=PL8dVGjLA2oMr09amgERARsZyrOz_sPvqw): Cloudinary developer podcasts on YouTube.
- [Cloudinary Academy](https://training.cloudinary.com/): Free self-paced courses, instructor-led virtual courses, and on-site courses.
- [Code Explorers and Feature Demos](https://cloudinary.com/documentation/code_explorers_demos_index): A one-stop shop for all code explorers, Postman collections, and feature demos found in the docs.
- [Cloudinary Roadmap](https://cloudinary.com/roadmap): Your chance to follow, vote, or suggest what Cloudinary should develop next.
- [Cloudinary Facebook Community](https://www.facebook.com/groups/CloudinaryCommunity): Learn from and offer help to other Cloudinary developers.
- [Cloudinary Account Registration](https://cloudinary.com/users/register/free): Free Cloudinary account registration.
- [Cloudinary Website](https://cloudinary.com): Learn about Cloudinary's products, partners, customers, pricing, and more.


## Licence
Released under the MIT license.
