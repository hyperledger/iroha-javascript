# いろはjs (irohajs)  

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## What's いろは(iroha)?  
いろは(iroha) is [this](https://github.com/soramitsu/iroha).

## Description  
いろはjs(irohajs) is client javascript library for using いろは(iroha).  
[demo](https://soramitsu.github.io/iroha-javascript/)

## Requirement  
* [js-sha3](https://github.com/emn178/js-sha3)
* [supercop.js(GUCCI-swallow)](https://github.com/GUCCI-swallow/supercop.js)

## Installation  
*  Clone this repository.
*  [Download the latest release]().
*  [Feature]Install with npm/bower.

## Usage
### Load

```html
<script src="/path/to/iroha.js"></script>
```

### API
#### iroha.createKeyPair

```js
var keys = iroha.createKeyPair();
```



Return key object.  
**Response**:

```js
{
	publicKey: A 32 byte public key encoded base64,
	privateKey: A 64 byte private key encoded base64
}
```
#### iroha.createSignature

```js
var keys = iroha.createSignature();
```



Return key object.  
**keys**:

```js
//keys
{
	publicKey: A 32 byte public key encoded base64,
	privateKey: A 64 byte private key encoded base64,
    message: A message
}
```
**Response**:

signature(A signature string  encoded base64)  

#### iroha.verify

```js
var keys = iroha.verify();
```


Return key object.  
**keys**:

```js
//keys
{
	publicKey: A 32 byte public key encoded base64,
    signature: A signature,
    message: A message
}
```
**Response**:

Return True or False;

### Development Guide

#### Features

 - Zero-setup. After running `npm install` things will be setup for you :wink:
 - **[Webpack 2](https://webpack.js.org/)** for UMD bundle, with [Tree-shaking](https://webpack.js.org/guides/tree-shaking/) dead code elimination
 - Tests, coverage and interactive watch mode using **[Jest](http://facebook.github.io/jest/)** and **[Karma](https://karma-runner.github.io/)**
 - **[TSLint](https://palantir.github.io/tslint/)** ([standard-config](https://github.com/blakeembrey/tslint-config-standard)) for your code styling
 - **Docs automatic generation and deployment** to `gh-pages`, using **[TypeDoc](http://typedoc.org/)**
 - Automatic types `(*.d.ts)` file generation
 - **[Travis](https://travis-ci.org)** integration and **[Coveralls](https://coveralls.io/)** report
 - (Optional) **Automatic releases and changelog**, using [Semantic release](https://github.com/semantic-release/semantic-release), [Commitizen](https://github.com/commitizen/cz-cli), [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog) and [Husky](https://github.com/typicode/husky) (for the git hooks)

#### NPM scripts

 - `npm t`: Run test suite
 - `npm run test:browser`: Run test suite for browser
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting + generate coverage
 - `npm run build`: Bundles code, create docs and generate typings
 - `npm run build:dev`: Same than `build`, but code is not minified
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

#### Automatic releases

If you'd like to have automatic releases with Semantic Versioning, follow these simple steps.

_**Prerequisites**: you need to create/login accounts and add your project to:_
 - npm
 - Travis
 - Coveralls

Set up the git hooks (see [Git hooks section](#git-hooks) for more info):

```bash
node tools/init-hooks
```

Install semantic release and run it (answer NO to "Generate travis.yml").

```bash
npm install -g semantic-release-cli
semantic-release setup
# IMPORTANT!! Answer NO to "Generate travis.yml" question. Is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on github and npm, plus generates automatically a changelog. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

#### Git Hooks

By default, there are 2 disabled git hooks. You can enable them by running `node tools/init-hooks` (which uses [husky](https://github.com/typicode/husky)). They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not gonna fail in [Travis](https://travis-ci.org) (or your CI server), since it's runned locally before `git push`

This makes more sense in combination of [automatic releases](#automatic-releases)

#### FAQ

##### Why using TypeScript and Babel?

In most cases, you can compile TypeScript code to ES5, or even ES3. But in some cases, where you use "functional es2015+ features", such as `Array.prototype.find`, `Map`, `Set`... then you need to set `target` to "es6". This is by design, since TypeScript only provides down-emits on syntactical language features (such as `const`, `class`...), but Babel does. So it's set up in a 2 steps build so you can use es2015+ features.

This should be transparent for you and you shouldn't even notice. But if don't need this, you can remove Babel from the build:
 - Set target to "es5" or "es3" in `tsconfig.json`
 - Remove `"useBabel": true` from `tsconfig.json`

More info in [https://github.com/Microsoft/TypeScript/issues/6945](https://github.com/Microsoft/TypeScript/issues/6945)

##### What if I don't want git-hooks, automatic releases or semantic-release?

Then you may want to:
 - Remove `commitmsg`, `postinstall` scripts from `package.json`. That will not use those git hooks to make sure you make a conventional commit
 - Remove `npm run semantic-release` from `.travis.yml`

##### What if I don't want to use coveralls or report my coverage?

Remove `npm run report-coverage` from `.travis.yml`

##### What is `npm install` doing the first time runned?

It runs the script `tools/init` which sets up everything for you. In short, it:
 - Configures webpack for the build, which creates the umd library, generate docs, etc.
 - Configures `package.json` (typings file, main file, etc)
 - Renames main src and test files

## Credits

Made with :heart: by [GUCCI-swallow](https://github.com/GUCCI-swallow) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/20982317?v=3&s=460" width="100px;"/><br /><sub>誠</sub>](https://github.com/takemiyamakoto)<br />[💻](https://github.com/GUCCI-swallow/iroha-javascript/commits?author=takemiyamakoto) | [<img src="https://avatars0.githubusercontent.com/u/12592891?v=3&s=460" width="100px;"/><br /><sub>Satoshi Kaji</sub>](https://github.com/luca3104)<br />[📖](https://github.com/GUCCI-swallow/iroha-javascript/commits?author=luca3104) | [<img src="https://avatars0.githubusercontent.com/u/11345397?v=3&s=460" width="100px;"/><br /><sub>6londe</sub>](https://github.com/6londe)<br />[📖](https://github.com/GUCCI-swallow/iroha-javascript/commits?author=6londe) | [<img src="https://avatars3.githubusercontent.com/u/475517?v=3&s=460" width="100px;"/><br /><sub>George Theofilis</sub>](https://github.com/theofilis)<br />[💻](https://github.com/GUCCI-swallow/iroha-javascript/commits?author=theofilis) [⚠️](https://github.com/GUCCI-swallow/iroha-javascript/commits?author=theofilis) 🔧 |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

Copyright 2016 Soramitsu Co., Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
