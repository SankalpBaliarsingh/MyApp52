module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@utils': './src/utils',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@navigation': './src/navigation',
                    }
                }
            ],
            "react-native-reanimated/plugin",
        ],
    };
};