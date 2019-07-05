const {
	VueLoaderPlugin
} = require("vue-loader");

module.exports = [{
		entry: "./src/js/React/prueba.js",
		output: {
			path: __dirname + "/src/js/prueba",
			filename: "bundle.js"
		},
		mode: 'production',
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}]
		},
		resolve: {
			extensions: ["*", ".js", ".vue", ".jsx", ".json"]
		}
	},
	{
		//Ventas
		entry: "./src/js/Vue/Ventas/ventas.js",
		output: {
			path: __dirname + "/files/static/src/js/ventas",
			filename: "bundle.js"
		},
		mode: 'production',
		module: {
			rules: [{
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
			path: __dirname + "/files/static/src/js/asignaciones",
			filename: "bundle.js"
		},
		mode: 'production',
		module: {
			rules: [{
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
		entry: "./src/js/React/Compras/Monitor.js",
		output: {
			path: __dirname + "/files/static/src/js/compras/monitor",
			filename: "bundle.js"
		},
		mode: 'production',
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}]
		},
		resolve: {
			extensions: ["*", ".js", ".vue", ".jsx", ".json"]
		}
	},
	{
		entry: "./src/js/React/Usuarios/index.jsx",
		output: {
			path: __dirname + "/files/static/src/js/usuarios",
			filename: "main.js"
		},
		mode: 'production',
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}]
		},
		resolve: {
			extensions: ["*", ".js", ".vue", ".jsx", ".json"]
		}
	}
];