
# lowstore

The purposes is to have a convenient state store that emits an event when it's changed.

`npm install lowstore`

Platforms:
+ node
+ electron
+ browser [dist/lowstore.min.js](https://raw.githubusercontent.com/tcrowe/lowstore/master/dist/lowstore.min.js)
+ webpack

It uses these powerful lodash functions underneath:
+ [\_.get](https://lodash.com/docs/#get)
+ [\_.set](https://lodash.com/docs/#set)

## Create a lowstore

```js
var lowstore = require("lowstore");
var store = lowstore();
```

## Store members

+ **property** `store.internal`
+ **function** [store.get](#storeget) -> `object`
+ **void** [store.set](#storeset) `path`, `val`
+ **void** [store.hset](#storehset) `path`, `subpath`, `val`
+ **void** [store.push](#storepush) `path`, `val`
+ **void** [store.removeIndex](#storeremoveIndex) `path`, `index`
+ **void** [store.toggle](#storetoggle) `path`, `val1`, `val2`
+ **void** [store.assign](#storeassign) `[path]`, `val`

## Access the state

+ **property** `store.internal`

```js
console.log("store.internal", store.internal)
// store.internal, {}
```

## Changes

`store` is an [EventEmitter](http://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter)

It just has one **event**: `store-change`

```js
store.on("store-change", function() {
  console.log("store changed", store.internal)
});
```

## store.get

+ **string** `path`

**returns** `object` or `undefined`

```js
var val = store.get("key1.key2");
console.log("val", val);
// → val === undefined

store.set("key1.key2", "twinkle");
val = val.get("key1.key2");
// → val === "twinkle"
```

It returns anything that it was `store.set` to. If nothing was ever set it returns `undefined`.

There's unlimited nesting: `one.two.three.four.five[6].seven[8]`

See [_.get](https://lodash.com/docs/#get) for how this works.

## store.set

+ **string** `path`
+ **object** `val`

```js
store.set("key1.key2", "hi")
// → store.internal === { key1: { key2: "hi" } }

var val = store.get("key1.key2");
// → val === "hi"
```

Set `val` to to any type of value. Most of the functions use `store.set` internally.

See [_.set](https://lodash.com/docs/#set) for more.

## store.hset

+ **string** `path`
+ **string** `subpath`
+ **object** `val`

```js
store.hset("key1.key2", "key3", "three");
// → store.internal === { key1: { key2: { key3: "three" } } }

var val = store.get("key1.key2.key3");
// → val === "three"
```

`store.hset` is inspired by Redis' hash set operation. It sets an object property.

## store.push

+ **string** `path`
+ **object** `val`

Push an item onto an `Array`.

```js
store.push("key1.key2", "first!");
// → store.internal === { key1: { key2: ["first!"] } }


store.push("key1.key2", "second");
store.push("key1.key2", "third");
// → store.internal === { key1: { key2: ["first!", "second", "third"] } }
```

## store.removeIndex

+ **string** `path`
+ **number** `index`

Remove `Array` item by `index`.

```js
store.push("key1.key2", "first!");
// → store.internal === { key1: { key2: ["first!"] } }
//
store.removeIndex("key1.key2", 0);
// → store.internal === { key1: { key2: [] } }
```

## store.toggle

+ **string** `path`
+ **object** `val1` *optional*
+ **object** `val2` *optional*

```js
store.toggle("key1.key2", "one", "two");
// → store.internal === { key1: { key2: "one" } } <-- val1

store.toggle("key1.key2", "one", "two");
// → store.internal === { key1: { key2: "two" } } <-- val2

store.toggle("key1.key2", "one", "two");
// → store.internal === { key1: { key2: "one" } } <-- back to val1

store.toggle("happy")
// → store.internal === { happy: true, key1: { key2: "one" } } <-- true

store.toggle("happy")
// → store.internal === { happy: false, key1: { key2: "one" } } <-- false
```

+ values are optional
+ values can be `Boolean`, `String`, or `Number`
+ no values assumes `Boolean`

It could be modified to do deep object comparisons.

## store.assign

+ **string* `path` *optional*
+ **object** `val`

```js
store.assign("key1.key2", { five: 5 });
// → store.internal === { key1: { key2: { five: 5 } } }

store.assign({ six: 6 });
// → store.internal === { six: 6, key1: { key2: { five: 5 } } }
```

Using it without any path will just merge into `state.internal`.

## Why use lowstore?

+ The API can be mastered in less than an hour.
+ People complain a lot about the difficulty state libraries.
+ alternative to redux
+ alternative to mobx
+ client/GUI virtual-dom state
+ server memory persistence
+ uses mutation

## Copying, license, and contributing

Copyright (C) Tony Crowe <github@tonycrowe.com> (https://tcrowe.github.io) 2018

Thank you for using and contributing to make lowstore better.

⚠️ Please run `npm run prd` before submitting a patch.

⚖️ lowstore is Free Software protected by the GPL 3.0 license. See [./COPYING](./COPYING) for more information. (free as in freedom)
