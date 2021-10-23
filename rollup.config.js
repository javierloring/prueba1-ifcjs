import resolve from '@rollup/plugin-node-resolve';

// rollup.config.js
export default {
    input: 'index.js',
    output: [{
        file: 'bundle.js',
        format: 'esm'
    }, ],
    plugins: [
        resolve(),
    ]
};