import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
)
