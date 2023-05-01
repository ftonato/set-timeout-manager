# set-timeout-manager

[![npm version](https://img.shields.io/npm/v/set-timeout-manager.svg)](https://www.npmjs.com/package/set-timeout-manager)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ftonato/set-timeout-manager/blob/main/LICENSE)

A utility class for managing timeouts created by `setTimeout`.

## Installation

You can install the package using npm:

```bash
npm install set-timeout-manager
```

## Examples

```js
// ES6 import
import SetTimeout from 'set-timeout-manager';

// (or) CommonJS require
const SetTimeout = require('set-timeout-manager');


const mockFn = () => 'set-timeout-manager';

// --- (start + clear) ---

SetTimeout.start(mockFn, 1000, 'basic-example');

SetTimeout.clear('basic-example');

// --- (start + clearAll) ---

SetTimeout.start(mockFn, 1000, 'timeout-one');
SetTimeout.start(mockFn, 1500, 'timeout-two');
SetTimeout.start(mockFn, 2000, 'timeout-three');

SetTimeout.clearAll();

// --- (start + listAll) ---

SetTimeout.start(mockFn, 1000, 'timeout-one');
SetTimeout.start(mockFn, 1500, 'timeout-two');

SetTimeout.listAll(); // => ['timeout-one', 'timeout-two']

SetTimeout.clear('timeout-one');

SetTimeout.listAll(); // => ['timeout-two']
```

----

## API

### `SetTimeout`

The main class exported by the package.

#### `start(fn: TimeoutFn, delay: number, key: string): void`

Starts a new timeout that calls the specified function at the specified delay.

- `fn` (required): The function to call.
- `delay` (required): The delay (in milliseconds) at which to call the function.
- `key` (required): A unique string identifier for the timeout.

#### `clear(key: string): void`

Stops the timeout with the specified key.

- `key` (required): The string identifier for the timeout to stop.

#### `clearAll(): void`

Stops all timeouts managed by this utility.

#### `listAll(): string[]`

Gets an array of all keys currently being used to manage timeouts.

----

## License

This package is released under the [MIT License](https://github.com/ftonato/set-timeout-manager/blob/main/LICENSE).