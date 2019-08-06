module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
        modules: false
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-react-jsx"
  ]
};
