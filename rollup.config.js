import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
    input: 'src/index.jsx', // Entry point of your library
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs', // CommonJS format
            sourcemap: true
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm', // ES Module format
            sourcemap: true
        }
    ],
    external: ['react', 'react-dom'], // Mark React as external so it's not bundled
    plugins: [
        peerDepsExternal(), // Ensures peer dependencies are handled
        babel({ babelHelpers: 'bundled' }) // Use Babel to transpile the code
    ]
};
