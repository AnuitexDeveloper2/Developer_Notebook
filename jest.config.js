module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    testEnvironment: 'jsdom',
    globals: {
        TextEncoder: require('util').TextEncoder,
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            diagnostics: {
                ignoreCodes: [151001],
            },
            isolatedModules: true,
        },
    },
    resetMocks: true,
    moduleNameMapper: {
        '@hookform/resolvers/yup': '<rootDir>/node_modules/@hookform/resolvers/yup/dist/yup.js',
        '^.+\\.(css|less|scss)$': '<rootDir>/webpack/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/test.setup.ts'],
};
