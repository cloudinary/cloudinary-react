
1.1.4 / 2019-07-25
=============

  * Update changelog

1.1.3 / 2019-07-25
==================
  * Update CHANGELOG.md

1.1.2 / 2019-07-25
==================

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
