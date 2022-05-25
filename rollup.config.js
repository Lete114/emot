import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import serve from 'rollup-plugin-serve'
import { babel } from '@rollup/plugin-babel'
import { main, module, jsdelivr } from './package.json'

const production = !process.env.ROLLUP_WATCH
const input = 'src/main.js'
const name = 'Emot'

const plugins = [
  babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
  !production && serve({ port: 6870, host: '127.0.0.1', contentBase: ['dist', 'public'] }),
  production && del({ targets: 'dist/*' }),
  production && terser()
]

let options = [
  {
    input,
    output: {
      sourcemap: true,
      format: 'iife',
      name,
      file: jsdelivr
    },
    plugins,
    watch: {
      clearScreen: false
    }
  }
]

if (production) {
  const output = [
    {
      input,
      output: {
        format: 'esm',
        name,
        file: module
      }
    },
    {
      input,
      output: {
        format: 'cjs',
        name,
        exports: 'auto',
        file: main
      }
    }
  ]
  options = [...options, ...output]
}

export default options
