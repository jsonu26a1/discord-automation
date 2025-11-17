import * as esbuild from 'esbuild'
import { esbuild_options } from './build-config.js'

await esbuild.build(esbuild_options.base)
