const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge").merge;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const paths = {
	src: path.resolve(__dirname, "./src"),

	// Production build files
	build: path.resolve(__dirname, "./dist"),

	// Static files that get copied to build folder
	public: path.resolve(__dirname, "./public"),
};

module.exports = (env) => {
	const config = {
		entry: "./src/index.ts",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				},
				{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
				{
					test: /\.wav$/,
					loader: "file-loader",
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts/",
							},
						},
					],
				},
			],
		},
		optimization: {
			splitChunks: {
				chunks: "all",
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
			new CleanWebpackPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.public,
						to: "assets",
						globOptions: {
							ignore: ["*.DS_Store"],
						},
						noErrorOnMissing: false,
					},
				],
			}),
		],
	};

	const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);
	const mergedConfig = merge(config, envConfig);

	return mergedConfig;
};
