/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
  ignoreFiles: ['node_modules', 'public/build/**/*.css'],
  rules: {
    // Allow \. in custom properties for names with values smaller than 1 (e.g. --spacing-0\.5)
    'custom-property-pattern': /^(?:[a-zA-Z0-9]+-?|\\.)+$/,
    // BEM syntax
    'selector-class-pattern':
      /^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$/,
  },
};
