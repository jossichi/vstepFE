module.exports = {
  entry: "./src/index.js",
  output: { 
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/html5-qrcode/,
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
