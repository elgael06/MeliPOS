const { VueLoaderPlugin } = require("vue-loader");

module.exports = [
  {
    entry: "./src/js/React/prueba.js",
    output: {
      path: __dirname + "/dist/prueba",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".vue", ".jsx", ".json"]
    }
  },
  {
    //Ventas
    entry: "./src/js/Vue/Ventas/ventas.js",
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
    entry: "./src/js/Vue/Asignaciones/asignaciones.js",
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
