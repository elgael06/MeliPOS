const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = [
  {
    //Ventas
    entry: "./Source/Vue/Ventas/ventas.js",
    output: {
      path: __dirname + "/files/static/dist/ventas",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      },
      extensions: ["*", ".js", ".vue", ".json"]
    },
    plugins: [new VueLoaderPlugin()]
  },
  {
    //asignaciones
    entry: "./Source/Vue/Asignaciones/asignaciones.js",
    output: {
      path: __dirname + "/files/static/dist/asignaciones",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      },
      extensions: ["*", ".js", ".vue", ".json"]
    },
    plugins: [new VueLoaderPlugin()]
  }
];
