
const path = require("path");

const htmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    // Se establece la opción 'modo' en 'desarrollo' para habilitar los
    // valores predeterminados para cada entorno. Falla si no se pone
    mode: 'development',
    // Cambiamos los puntos de entrada tratándolo en vez de como un array, como un objeto con su par: clave-valor
    // Defino un punto de entrada para la aplicación --> app
    // Defino un punto de entrada para el css --> appStyles
    entry: {
        app: "./src/index.js",
        appStyles: "./src/mystyles.scss"
    },
    output: {
        filename: "[name].[chunkhash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                // Usamos el plugin: mini-css-extract-plugin para tener un ficher externo de css.
                // Previamente hay que instalarlo con npm install
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.(png|jp?g|gif|svg)$/,
                type: "asset/resource",
            }
        ],
    },
    plugins: [
        // Instanciamos el htmlWebPackPlugin
        new htmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            scriptLoading: 'blocking',
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        }),
    ],
    devServer: {
        port: 9000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'src'),
        }
    },
};