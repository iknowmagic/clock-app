module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/vue'
  ],
  plugins: ['flowtype', 'simple-import-sort'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'prettier/prettier': 'warn',

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'no-unused-vars': 'warn',
    'no-useless-escape': 'warn',
    'no-unreachable': 'warn',

    'vue/no-unused-components': 'warn',
    'vue/name-property-casing': ['warn', 'PascalCase'],
    'vue/component-name-in-template-casing': ['warn', 'kebab-case'],

    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/sort': [
      'warn',
      {
        groups: [
          ['promise', 'polyfills', 'core-js'],

          // vue import
          ['^vue$'],

          // Side effect imports.
          ['^\\u0000'],

          // Packages.
          // App Items
          ['^vuex-pathify'],
          ['^lodash'],
          ['^uniqid', '^moment', '^alasql'],
          ['^@/state', '^@/services'],
          ['^@/helpers'],
          ['^@/components'],

          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],

          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything that does not start with a dot.
          ['^[^.]'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.']
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.spec.js', 'tests/**/*'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: {
        jest: true
      },
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false
      },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
