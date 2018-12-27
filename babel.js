module.exports = (env = {}, plugins = []) => ({
  plugins: [        
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
    "@babel/plugin-proposal-class-properties",        
    ["macros"],
    [
      "import", {
        "libraryName": "antd",
        "style": true
      }
    ],
    ['transform-define', env],
    ...plugins,
  ],
  presets: ["next/babel"],
})
