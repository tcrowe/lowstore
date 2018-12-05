
# lowstore

The purposes is to have a convenient state store that emits an event when it's changed.

`npm install lowstore`

Platforms:
+ node
+ electron
+ browser [dist/lowstore.min.js](https://raw.githubusercontent.com/tcrowe/lowstore/master/dist/lowstore.min.js)
+ webpack

It uses these powerful lodash functions underneath:
+ [\_.get](https://lodash.com/docs/4.17.4#get)
+ [\_.set](https://lodash.com/docs/4.17.4#set)

```js
var lowstore = require("lowstore");
var store = lowstore();

// access the state
console.log("store.internal", store.internal)
// {}

//
// store-change event
//
store.on "store-change", function() {
  console.log("store changed", store.internal)
});

//
// store.get
//
var val = store.get("key1.key2");

//
// store.get
//
store.set("key1.key2", "val")

//
// store.hset
//
store.hset("key1.key2", "key3", "val");

//
// store.push
//
store.push("key1.key2", "val");

//
// store.remove
//
store.removeIndex("key1.key2", 0); // the array index

//
// store.toggle
//
store.toggle("key1.key2", "val1", "val2");
// + values are optional
// + values can be any type
// + no values assumes boolean

//
// store.assign
//
store.assign("key1.key2", { five: 5 });
store.assign({ six: 6 });
```

## Why use lowstore?

+ The API can be mastered in less than an hour.
+ People complain a lot about the difficulty state libraries.
+ alternative to redux
+ alternative to mobx
+ client/GUI virtual-dom state
+ server memory persistence

## Copying, license, and contributing

Copyright (C) Tony Crowe <github@tonycrowe.com> (https://tcrowe.github.io) 2018

Thank you for using and contributing to make lowstore better.

⚠️ Please run `npm run prd` before submitting a patch.

⚖️ lowstore is Free Software protected by the GPL 3.0 license. See [./COPYING](./COPYING) for more information. (free as in freedom)
