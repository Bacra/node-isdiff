Find Differences Between two JavaScript Objects
==========

## Install

```shell
npm install isdiff
```

## Usage

```javascript
import {
  isdiff, isdiffWithoutCycle,
  equal, equalWithoutCycle,
} from 'isdiff';

console.log(isdiffWithoutCycle({ a: 1, b: 1 }, { a: 1, b: 1 }));  // false

const obj1 = { b: 1 };
obj1.a = obj1;

console.log(isdiff(obj1, { a: {}, b: 1 }));  // true
```
