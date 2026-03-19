const useImportMetaTransform = !process.execArgv.includes('--experimental-vm-modules');

module.exports = {
    presets: ['@babel/preset-env'],
    plugins: useImportMetaTransform ? ['babel-plugin-transform-import-meta'] : []
};
