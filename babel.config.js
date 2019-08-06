module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false,
        modules: "commonjs"
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-react-jsx"
  ]
};
