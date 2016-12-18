# いろはjs (irohajs)  

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
or

```js
import Iroha from 'iroha.js'
var Iroha = require('iroha.js')
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
var keys = iroha.createSignature({
            publicKey: A 32 byte public key encoded base64,
            privateKey: A 64 byte private key encoded base64,
            message: A message
           });
```



Return key object.  

**Response**:

signature(A signature string  encoded base64)  

#### iroha.verify

```js
var keys = iroha.verify({
            publicKey: A 32 byte public key encoded base64,
            signature: A signature,
            message: A message
           });
```


Return key object.  

**Response**:

Return True or False;

## Author  
[GUCCI-swallow](https://github.com/GUCCI-swallow)

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
