module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    // transformIgnorePatterns: ['node_modules/(?!(.+hex-my-bytes)/)'],
};
