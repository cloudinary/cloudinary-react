import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

// Custom matcher, used to add expect.toEndWith() to Jest
const toEndWith = (string, suffix) => {
  const pass = string.endsWith(suffix)
  if (pass) {
    return {
      pass: true,
      message:
        matcherHint('.not.toEndWith') +
        '\n\n' +
        'Expected string to not end with:\n' +
        `  ${printExpected(suffix)}\n` +
        'Received:\n' +
        `  ${printReceived(string)}`
    }
  }

  return {
    pass: false,
    message:
      matcherHint('.toEndWith') +
      '\n\n' +
      'Expected string to end with:\n' +
      `  ${printExpected(suffix)}\n` +
      'Received:\n' +
      `  ${printReceived(string)}`
  }
}

export { toEndWith }
