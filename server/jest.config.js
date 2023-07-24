module.exports = {
    // A preset used as a base for Jest's configuration
    preset: 'ts-jest',
    // This will be used to configure minimum threshold enforcement for coverage results
    // With the following configuration jest will fail if there is less than around 80% branch,
    // line, and function coverage
    coverageThreshold: {
      global: {
        functions: 79,
        lines: 80,
        statements: 80,
      },
    },
    // Default timeout of a test in milliseconds.
    testTimeout: 10000,
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    collectCoverageFrom:[
      "src/**"
    ],
    // Indicates the code transformation into javascript when the test running
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testEnvironment: 'node',
    
    testMatch: ['**/test/**/*.test.(ts|tsx)'],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed
    // In this case indicates that the environment configuration will be executed before each test
    setupFiles: ['<rootDir>/test/env.ts'],
    
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['text', 'text-summary'],

    // The pattern or patterns Jest uses to detect test files
    // By default it looks for .js, .jsx, .ts and .tsx as well as any files with a suffix of .test or .spec
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
    // An array of regexp pattern strings that are matched against all test paths before executing the test.

    // If the test path matches any of the patterns, it will be skipped.
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/', '/dist/'],
    
  }