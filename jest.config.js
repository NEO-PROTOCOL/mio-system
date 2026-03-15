module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**',
    '!src/server.js' // Old file
  ],
  coverageThreshold: {
    global: {
      branches: 39,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  verbose: true
};
