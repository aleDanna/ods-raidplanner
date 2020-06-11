const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {NODE_ENV = 'production',} = process.env;
const pages = ['RaidsPage/RaidsPageEntry'];

const generateEntryPoints = (entry) => {
  return entry.reduce((obj, item) => {
    return {
      ...obj,
      [item]: [path.resolve('src', 'pages', `${item}.ts`)]
    }
  }, {})
}

const serverConfig = {
    watch: NODE_ENV === 'development',
    externals: [ nodeExternals() ],
    entry: './src/server/server.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },
    devtool: 'source-map'
}
const clientConfig = {
    entry: {...generateEntryPoints(pages)},
    output: {
        path: __dirname + '/build',
        filename: '[name].ts',
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
        ],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
}

module.exports = [serverConfig, clientConfig]