const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const pkg = require('./package.json');

module.exports = {
  input: './lib/index.js',
  output: {
    file: pkg['main'],
    format: 'umd',
    name: 'valirator'
  },
  sourcemap: true,
  plugins: [
    commonjs({
      include: 'node_modules/**',
      extensions: [
        '.js'
      ]
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: [
        '.js'
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    })
  ],
};
