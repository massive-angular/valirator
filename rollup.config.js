const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const pkg = require('./package.json');

module.exports = {
  entry: './lib/index.js',
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
  targets: [{
    dest: pkg['main'],
    format: 'umd',
    sourceMap: true,
    moduleName: 'valirator'
  }, {
    dest: pkg['jsnext:main'],
    format: 'es',
    sourceMap: true
  }]
};
