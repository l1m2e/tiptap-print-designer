import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    rules: {
      'antfu/if-newline': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'symbol-description': 'off',
    },
    ignores: ['packages/core/src/components/ui/**/*'],
    includes: ['packages/**/*'],
  },
)
