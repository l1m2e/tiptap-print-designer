import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    rules: {
      'antfu/if-newline': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
    ignores: ['src/components/common/template/**/*.vue'],
  },
)
