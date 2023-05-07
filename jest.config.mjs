import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // The path to Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
