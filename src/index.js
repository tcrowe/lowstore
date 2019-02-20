const get = require("lodash/get");
const set = require("lodash/set");
const assign = require("lodash/assign");
const merge = require("lodash/merge");
const isNil = require("lodash/isNil");
const { EventEmitter } = require("events");

/**
 * Create a lowstore object
 * @method lowstore
 * @returns {object}
 */
function lowstore() {
  const store = new EventEmitter();
  store.internal = {};

  /**
   * Get any value by path
   * @method store.get
   * @param {string} path
   * @returns {object|undefined}
   */
  store.get = path => get(store.internal, path);

  /**
   * Set any value by path
   * @method store.set
   * @param {string} path
   * @param {object} val
   * @returns {void}
   */
  store.set = function(path, val) {
    set(store.internal, path, val);
    store.emit("store-change");
  };

  /**
   * Hash table set(set object property operation) inspired by Redis
   * @method store.hset
   * @param {string} path
   * @param {string} subpath
   * @param {object} val
   * @returns {void}
   */
  store.hset = function(path, subpath, val) {
    const obj = store.get(path) || {};
    set(obj, subpath, val);
    store.set(path, obj);
  };

  /**
   * Array push by path
   * @method store.push
   * @param {string} path
   * @param {object} val
   * @returns {void}
   */
  store.push = function(path, val) {
    const arr = store.get(path) || [];
    arr.push(val);
    store.set(path, arr);
  };

  /**
   * Remove an array item by index
   * @method store.removeIndex
   * @param {string} path
   * @param {number} index
   * @returns {void}
   */
  store.removeIndex = function(path, index) {
    let arr = store.get(path) || [];
    arr = arr.filter((item, arrIndex) => index !== arrIndex);
    store.set(path, arr);
  };

  /**
   * Toggle values
   *
   * When no values are passed it assumes a boolean value and toggles it
   *
   * If both values provided it will toggle between them or the first if unset
   *
   * If the same it
   * @method store.toggle
   * @param {string} path
   * @param {object} [val1]
   * @param {object} [val2]
   * @returns {void}
   */
  store.toggle = function(path, val1, val2) {
    const val = store.get(path);

    if (isNil(val1) === true && isNil(val2) === true) {
      // no values passed, assuming boolean toggle operation
      store.set(path, !val);
      return;
    }

    if (isNil(val) === true || val === val2) {
      // with no value set val1
      // ...or existing value is the same as val2, using val1
      store.set(path, val1);
      return;
    }

    // the only case left is to set val2
    store.set(path, val2);
  };

  /**
   * Assign a value at the path
   * @method assign
   * @param {string} path
   * @param {object} val
   * @returns {void}
   */
  store.assign = function(path, val) {
    if (typeof path === "string" && typeof val === "object") {
      let op = store.get(path) || {};
      op = assign(op, val);
      store.set(path, op);
      return;
    }

    val = path;
    store.internal = assign(store.internal, val);
    store.emit("store-change");
  };

  /**
   * Merge a value at the path
   * @method merge
   * @param {string} path
   * @param {object} val
   * @returns {void}
   */
  store.merge = function(path, val) {
    if (typeof path === "string" && typeof val === "object") {
      let op = store.get(path) || {};
      op = merge(op, val);
      store.set(path, op);
      return;
    }

    val = path;
    store.internal = merge(store.internal, val);
    store.emit("store-change");
  };

  return store;
}

module.exports = lowstore;
