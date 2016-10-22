var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

var pkg = require('./package.json');

module.exports = {
  entry: './src/valirator.js',
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
