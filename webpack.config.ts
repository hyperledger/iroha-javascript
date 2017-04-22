import { join } from "path";
const _ = require("lodash");
const minimist = require("minimist");
const { camelCase } = require("lodash");
const { TsConfigPathsPlugin, CheckerPlugin } = require("awesome-typescript-loader");
const TypedocWebpackPlugin = require("typedoc-webpack-plugin");

const DEFAULT_TARGET = "node";

const libraryName = "irohajs";

const nodeModules = ["grpc", "moment", "axios", "js-sha3", "supercop.js"];

const DEFAULT_PARAMS = {
  entry: join(__dirname, `src/${libraryName}.ts`),
  target: "node",
  devtool: "source-map",
  output: {
    path: join(__dirname, "dist"),
    libraryTarget: "umd",
    library: camelCase(libraryName),
    filename: `${libraryName}.js`
  },
  externals: nodeModules,
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new TypedocWebpackPlugin(
      {
        theme: "minimal",
        out: "docs",
        target: "es6",
        ignoreCompilerErrors: true
      },
      "src"
    )
  ]
};

const PARAMS_PER_TARGET: any = {
  node: {
    target: "node"
  },
  web: {
    target: "web",
    node: {
      fs: "empty",
      net: "empty",
      tls: "empty"
    }
  }
};

const target: string = _resolveBuildTarget(DEFAULT_TARGET);
const params: any = _.merge(DEFAULT_PARAMS, PARAMS_PER_TARGET[target], _mergeArraysCustomizer);

export default params;

function _resolveBuildTarget (defaultTarget: string): string {
  let target = minimist(process.argv.slice(2)).target;
  if (!target) {
    console.log("No build target provided, using default target instead\n\n");
    target = defaultTarget;
  }
  return target;
}

function _mergeArraysCustomizer (a: any, b: any): any {
  if (_.isArray(a)) {
    return a.concat(b);
  }
}
