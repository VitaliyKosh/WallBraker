import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { InjectManifest } from 'workbox-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

export function buildPlugins(
    {
        paths,
        isDev,
        analyze
    }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            title: 'Progressive Web Application11'
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/icons', to: 'icons' },
                { from: './src/manifest.json', to: '' }
            ]
        }),
        new InjectManifest({
            swSrc: './src/app/serviceWorker/index.ts',
            swDest: 'sw.js',
            maximumFileSizeToCacheInBytes: 70000000
        })
    ]

    if (isDev) {
        plugins.push(...[
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin()
        ])
    }

    // if (analyze) {
    //     plugins.push(...[
    //         new BundleAnalyzerPlugin(
    //             { openAnalyzer: true }
    //         )
    //     ])
    // }

    return plugins
}
