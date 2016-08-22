import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

export default {
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
      exclude: 'node_modules/**'
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
