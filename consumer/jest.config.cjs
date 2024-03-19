// .cjs as a workaround, something like https://github.com/jestjs/jest/issues/11453

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: null,
};

module.exports = config;
