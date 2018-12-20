
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
  * Separate class definition and export statements. Updated documentation comments.
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
