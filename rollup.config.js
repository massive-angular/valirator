import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

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
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**'
    })
  ],
  external: external,
  targets: [{
    dest: pkg['main'],
    format: 'umd',
    sourceMap: 'inline',
    moduleName: 'valirator'
  }, {
    dest: pkg['jsnext:main'],
    format: 'es',
    sourceMap: 'inline'
  }]
};
