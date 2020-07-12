
# babel-plugin-replace-import


## Installation

```
npm i babel-plugin-replace-import
```

or yarn

```
yarn add babel-plugin-replace-import
```

## Usage

Via `.babelrc` or babel-loader.

```
{
  "plugins": [["replace-import-path", options]]
}
```

### options

`options` can be object.

```
{
    src: 'test',
    dest: 'lib'
}
```

`options` can be an array.

```
[
    {
        src: 'test1',
        dest: 'lib1'
    },
    {
        src: /test\/(\w+)\/src/,
        dest: 'test/$1'
    }
]
```

## Example

**{ "src": "test1/aaa", dest: "test2/bbb" }**

```js
import { A } from 'test1/aaa';

↓ ↓ ↓ ↓ ↓ ↓

var a = require('test2/bbb');
```

## LICENSE
MIT
