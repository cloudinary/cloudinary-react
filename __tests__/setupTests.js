/**
 * Setup enzyme and some helper functions.
 * Why this file is here:
 * From https://create-react-app.dev/docs/running-tests/#initializing-test-environment:
 * "If your app uses a browser API that you need to mock in your tests or if you need a global setup before running your tests, add a src/setupTests.js to your project. It will be automatically executed before running your tests."
 */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-extended';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param {object} intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 *      overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 *      mock the intersection observer, but its methods.
 */
function setupIntersectionObserverMock({
  observe = () => null,
  unobserve = () => null
} = {}) {
  class IntersectionObserver {
    constructor(callback) {
      // This is the callback that notifies when an intersection occurs
      // We'll store it to use it later
      global.simulateIntersection = callback;
    }

    observe = observe
    unobserve = unobserve
  }
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver
  });
}

global.navigator = {
  userAgent: 'node.js'
};

setupIntersectionObserverMock();
