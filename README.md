# babel-plugin-replace-import

Replace import and require paths

Useful if you are working in a monorepo and you want to import from the `/src` directories to not compile the code every time you want to run tests

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
  "plugins": [["replace-import-path", {
        src: /test\/(\w+)\/src/,
        dest: 'test/$1'
    }]]
}
```

### options

`options` can be an object or array

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

import { A } from 'test2/bbb';
```

## LICENSE

MIT
