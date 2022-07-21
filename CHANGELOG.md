1.8.1 / 2022-07-21
==================

* Add support for authToken prop (#252)

1.8.0 / 2022-06-27
==================

New functionality
-----------------
  * Add support for React 18 (#246)

Other changes
-----------------
  * Add description to package


1.7.2 / 2022-03-24
==================
* bump immer and ejs versions in photo_album

1.7.1 / 2022-01-25
==================
* Update README.md
* Update sample app dependencies
* Update travis configuration

1.7.0 / 2021-02-28
==================

New functionality and features
------------------------------
* Add support for `sources` prop in Video component (#212)

Fixes
-----
* Fix video & audio mime types

Refactor
--------
* Add eslint and update code style (#219, #220)
* Update storybook (#218)
* Use microbundle instead of webpack (#215)
* Replace mocha+chai with jest (#213)

Other Changes
-------------
* Update sample app dependencies
* Remove bundled folder from sample app
* Update sample app config file
* Update tests (#209)

1.6.7 / 2020-10-04
==================

* Fix duplicate attributes for kebab-case props (#196)
* Update cloudinary-core version to 2.11.3

1.6.6 / 2020-07-27
==================

* Fix responsive placeholder image

1.6.5 / 2020-07-26
==================

* Fix lazy loading of responsive images in Safari

1.6.4 / 2020-07-26
==================

Update cloudinary-core to version 2.11.1

1.6.3 / 2020-07-26
==================

* Fix lazy loading of responsive images (#182)
* Update cloudinary-core to version 2.11.0

1.6.2 / 2020-07-16
==================

* Fix bug where non Cloudinary attribute names were changed (#181)
* Add test for image update on prop change (#174)
* Update readme: Audio, Placeholder & storybook

1.6.1 / 2020-07-11
==================

* Fix bug where image width was set to 'null' for responsive images
* Add a warning when 'responsive' prop is not affecting the transformation (#176)
* Update cloudinary-core dependency to version 2.10.3

1.6.0 / 2020-07-06
==================

New functionality and features
------------------------------
* Add support for lazy loading images, placeholder and accessibility (#162)

Other Changes
-------------
* Update cloudinary-core dependency to version 2.10.1
* Refactor Image component (#167)
* Update tests to fail when component is not exported
* Add test for variable names (#164)

1.5.1 / 2020-06-21
==================

* Fix Audio component export
* Update cloudinary-core to version 2.9.0

1.5.0 / 2020-04-23
==================

New functionality and features
------------------------------
* Add Audio component

Other Changes
-------------
* Fix test:all script in package.json
* Add bundle size check using bundlewatch (#157)
* Update issue templates (#155)
* Fix typo in CHANGELOG.md

1.4.0 / 2020-03-25
==================

* Add support for signature param
* Upgrade cloudinary-core version to ^2.8.2

1.3.4 / 2020-03-18
==================

* Fix video tag props were passed as snake_case instead of camelCase

1.3.3 / 2020-03-17
==================

* Fix video poster default frame to be the middle frame

1.3.2 / 2020-03-01
==================

* Remove docs folder from npm package

1.3.1 / 2020-03-01
==================

* Fix contextType to be class property of CloudinaryComponent (#145)
* Update sample project's dependencies (#127)
* Add Transformation test for font antialiasing and hinting (#126)
* Add /docs folder with storybook output
* Fix spelling in README.md


1.3.0 / 2019-12-26
==================

* Add support for innerRef to the Image & Video components
* Fix compile script
* Fix photo album sample app startup

1.2.1 / 2019-09-30
==================

* Fix image component responsive prop

1.2.0 / 2019-09-26
==================

* Upgrade to react 16.3.3 (#120)
    * Use new context api in CloudinaryContext
    * Remove usage of componentWillReceiveProps and componentWillUpdate in Image
* Add test for custom function invocation
* Add test for dynamic context
* Bump webpack-dev-server from 2.9.4 to 3.1.11 in /samples/photo_album

1.1.4 / 2019-07-25
=============

* Fix responsiveUseBreakpoints not affecting image size
* Fix build & console errors
* Exclude tests for Node 6 with sources
* Fix photo album sample app
* Add test for startOffset parameter
* Update TravisCI configuration
* Bump packages versions in /samples/photo_album

1.1.1 / 2019-06-06
==================

* Merge pull request #50 from runar-rkmedia/issue#49
    * Round off containerWidth
* Don't render Context as div (#81)
* Add fps test (#84)
* Update Dependencies
* Add test pages
* Separate transformation parameters from configuration
    * Increase performance of image rendering
* Add support for kebab-case and snake_case attribute names (#78)

1.1.0 / 2018-12-20
==================

* Add the `tools` folder and the `update_version` script
* Update package configuration
* Update tests configuration
* Upgrade webpack and babel
* Add "Join the Community"
* Use nextProps for updating calculated URL correctly (#73)
* Add test for user variables
* Merge pull request #59 from lisamartin00/bug/src-empty-string
    * Default src to undefined instead of empty string
* Merge pull request #42 from cloudinary/react-sample
    * create react sample application
    * use new react-sdk and fix imports
* Merge pull request #46 from IndependentContractor/master
    * Link to react documentation for configuration
* Undo `cp` rename

1.0.6 / 2018-01-18
==================

* Fix publish of previous version

1.0.6 / 2018-01-18
==================



1.0.5 / 2018-01-18
==================

* Filter Cloudinary custom props from rendered div (#37)
* React16 (#33)
* github-fixes-#31-error-maximum-call-stack-exceeded (#39)
* fixes #35 from github - video component ignores transformations (#38)
* Merge branch 'fBosch-master'
* Add test
* fix: pass props to CloudinaryContext's returned div

1.0.4 / 2017-05-25
==================

* Refactor test for Transformation. Fixes #17. Fixes #13. References #10.

1.0.3 / 2017-04-16
==================

* Add more informative responsive story
* Add dependency on `prop-types`

1.0.2 / 2017-03-01
==================

* Don't convert keys to snake_case in `normalizeOptions`. Fixes #6.
* SpponsiveUseBreakpoints not affecting image size
* Update photo album sample app
* Update TravisCI configuration
* Bump lodash-es from 4.17.4 to 4.17.15 in /samples/photo_album
* Add test for startOffset parameter
* Bump eslint from 4.10.0 to 4.18.2 in /samples/photo_album
* Bump diff from 3.4.0 to 3.5.0 in /samples/photo_album
* Bump clean-css from 4.1.9 to 4.1.11 in /samples/photo_album
* Bump handlebars from 4.0.11 to 4.1.2 in /samples/photo_album (#99)
* Bump lodash.template from 4.4.0 to 4.5.0 in /samples/photo_album
* Bump lodash from 4.17.11 to 4.17.14 in /samples/photo_album
* Merge pull request #102 from felixmosh/fix-album-demo
* Make index as key
* Fix build & console errors
* Exclude tests for Node 6 with sources
  rate class definition and export statements. Updated documentation comments.
* Use traditional array traversing to solve react native issue on Android
* Force Travis-ci to use npm version >=3. Add test for Node 6.x

1.0.1 / 2016-11-16
==================

* Add jsdom to development requirements
* Update name and location of repository in package.json and bower.json

1.0.0 / 2016-10-06
==================

# provide basic Cloudinary elements for React

* Image element
* Video element
* CloudinaryContext element
* Transformation element
