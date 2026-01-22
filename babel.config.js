/** @type {import('react-native-worklets/plugin').PluginOptions} */
const workletsPluginOptions = {
  // Optional: Add any custom options here if needed (most people leave it empty)
  // relativeSourceLocation: true,   // useful for better error stack traces in worklets
  // globals: ['myCustomGlobal'],     // if you have custom globals in worklets
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    // ... any other plugins you might have (e.g. 'module-resolver', etc.)

    // This MUST be the LAST plugin in the array!
    ['react-native-worklets/plugin', workletsPluginOptions],
  ],
};