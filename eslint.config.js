import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
)
