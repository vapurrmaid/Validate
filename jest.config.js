/**
 * Configuration used by Jest Runtime.
 *
 * @see {@link https://jestjs.io/docs/en/configuration.html}
 */
module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  resetMocks: true,
  transform: {
    "^.+\\.ts$": "ts-jest" // * Converts TS tests -> JS
  },
  verbose: true
};
