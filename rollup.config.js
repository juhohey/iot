/*jshint esversion:6*/
import fs from 'fs';
import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';

const getStyleVars = ()=>fs.readFileSync('./client/scss/variables.scss').toString();

export default {
  entry: 'client/js/index.js',
  dest:'public/bundle.js',
  sourceMap: false,
  plugins: [
     replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    sourcemaps(),
    sass({output: true, options:{ data:getStyleVars()}}),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      exclude:['./node_modules/lodash-es/**', './node_modules/symbol-observable/**'] /** Some problem with top level exports w/ React */
    }),
    babel(babelrc())
  ],
  format: 'iife',
  useStrict:false,
  moduleName:'app'
};
