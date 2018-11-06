const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const pkg = require('./package.json');

const plugins = [
  babel({
    exclude: 'node_modules/**',
  }),
  resolve(),
  commonjs(),
];

module.exports = [
  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      name: pkg.name,
      file: pkg.browser,
      exports: 'named',
      format: 'umd',
      sourcemap: true,
    },
    plugins,
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'lib/index.js',
    output: [
      {
        file: pkg.main,
        exports: 'named',
        format: 'cjs',
        sourcemap: true,
        plugins,
      },
      {
        file: pkg.module,
        exports: 'named',
        format: 'es',
        sourcemap: true,
        plugins,
      },
    ],
  },
];
