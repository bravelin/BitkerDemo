module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'indent': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 'off',
        'valid-jsdoc': 'off',
        'eol-last': 'off',
        'array-bracket-spacing': 'off',
        'no-unused-vars': 'off',
        'no-else-return': 'off',
        'strict': 'off',
        'no-irregular-whitespace': [
            'error',
            {
                'skipComments': true
            }
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'only-multiline',
                'objects': 'only-multiline'
            }
        ],
        'space-before-function-paren': ['error', 'never']
    },
    globals: {

    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
