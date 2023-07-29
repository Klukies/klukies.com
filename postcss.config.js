import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssNesting from 'postcss-nesting';

export default {
  plugins: [postcssNesting(), autoprefixer(), cssnano({ preset: 'default' })],
};