"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

var get = require("lodash/get");

var set = require("lodash/set");

var assign = require("lodash/assign");

var merge = require("lodash/merge");

var isNil = require("lodash/isNil");

var _require = require("events"),
  EventEmitter = _require.EventEmitter;

function lowstore() {
  var store = new EventEmitter();
  store.internal = {};

  store.get = function(path) {
    return get(store.internal, path);
  };

  store.set = function(path, val) {
    set(store.internal, path, val);
    store.emit("store-change");
  };

  store.hset = function(path, subpath, val) {
    var obj = store.get(path) || {};
    set(obj, subpath, val);
    store.set(path, obj);
  };

  store.push = function(path, val) {
    var arr = store.get(path) || [];
    arr.push(val);
    store.set(path, arr);
  };

  store.removeIndex = function(path, index) {
    var arr = store.get(path) || [];
    arr = arr.filter(function(item, arrIndex) {
      return index !== arrIndex;
    });
    store.set(path, arr);
  };

  store.toggle = function(path, val1, val2) {
    var val = store.get(path);

    if (isNil(val1) === true && isNil(val2) === true) {
      store.set(path, !val);
      return;
    }

    if (isNil(val) === true || val === val2) {
      store.set(path, val1);
      return;
    }

    store.set(path, val2);
  };

  store.assign = function(path, val) {
    if (typeof path === "string" && _typeof(val) === "object") {
      var op = store.get(path) || {};
      op = assign(op, val);
      store.set(path, op);
      return;
    }

    val = path;
    store.internal = assign(store.internal, val);
    store.emit("store-change");
  };

  store.merge = function(path, val) {
    if (typeof path === "string" && _typeof(val) === "object") {
      var op = store.get(path) || {};
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
