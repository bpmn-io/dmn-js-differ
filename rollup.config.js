import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg = JSON.parse(fs.readFileSync(
  fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8'
));


export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg['exports']['.'].node, format: 'cjs' },
      { file: pkg['exports']['.'].import, format: 'es' }
    ],
    external: [ 'dmn-moddle', 'diffpatch' ],
    plugins: pgl()
  }
];


function pgl(plugins = []) {

  return [
    ...plugins
  ];
}