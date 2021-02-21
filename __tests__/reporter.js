const {DefaultReporter} = require('@jest/reporters')

/**
 * A custom reporter that is silent (no console logs except for summary) when all tests have passed.
 * Since our Image component may print desired warnings to console (used to inform the end user of best practice),
 * we don't want them to clog the output.
 * As jest prints not only the warning, but also where it originated, which for our build test means a very long
 * output of gibberish that also takes a lot of compute time.
 */
class Reporter extends DefaultReporter {
  printTestFileHeader(_testPath, config, result) {
    // console is null when all tests have passed.
    const console = result.numFailingTests !== 0 || result.testExecError ? result.console : null;
    super.printTestFileHeader(_testPath, config, {...result, console})
  }
}

module.exports = Reporter