module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [0, 4],
        '@typescript-eslint/indent': [0, 4],
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx']
            }
        ],
        "@typescript-eslint/no-misused-promises": 0,
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/space-before-function-paren': 0,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/consistent-type-imports': 0,
        'no-underscore-dangle': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-redeclare': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-extraneous-class': 0,
        'max-len': ['error', {
            ignoreComments: true,
            code: 100
        }]
    },
    globals: {
        __IS_DEV__: true
    }
}
