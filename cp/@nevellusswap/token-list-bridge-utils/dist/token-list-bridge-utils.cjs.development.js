'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var dotenv = require('dotenv');
var fs = require('fs');
var axios = require('axios');
var ethers = require('ethers');
var L1GatewayRouter__factory = require('@arbitrum/sdk/dist/lib/abi/factories/L1GatewayRouter__factory');
var Web3 = require('web3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return n;
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var Web3__default = /*#__PURE__*/_interopDefaultLegacy(Web3);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
}(runtime));

var _regeneratorRuntime = runtime.exports;

var ChainId;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
  ChainId[ChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  ChainId[ChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
  ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
  ChainId[ChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
  ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
  ChainId[ChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
})(ChainId || (ChainId = {}));

function compareTokenInfos(t1, t2) {
  if (t1.chainId === t2.chainId) {
    return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
  }

  return t1.chainId < t2.chainId ? -1 : 1;
} // ref: https://github.com/OffchainLabs/arb-token-lists/blob/master/src/lib/utils.ts

function getTokenList(_x) {
  return _getTokenList.apply(this, arguments);
}

function _getTokenList() {
  _getTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(l1TokenListOrPathOrUrl) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(typeof l1TokenListOrPathOrUrl === 'string')) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", getTokenListObj(l1TokenListOrPathOrUrl));

          case 4:
            return _context5.abrupt("return", l1TokenListOrPathOrUrl);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getTokenList.apply(this, arguments);
}

var getTokenListObjFromUrl = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios__default["default"].get(url);

          case 2:
            return _context.abrupt("return", _context.sent.data);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTokenListObjFromUrl(_x2) {
    return _ref.apply(this, arguments);
  };
}();
var getTokenListObjFromLocalPath = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(path) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", JSON.parse(fs.readFileSync(path).toString()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTokenListObjFromLocalPath(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getTokenListObj = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(pathOrUrl) {
    var tokenList;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(pathOrUrl) {
                var localFileExists, looksLikeUrl;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        localFileExists = fs.existsSync(pathOrUrl);
                        looksLikeUrl = isValidHttpUrl(pathOrUrl);

                        if (!localFileExists) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return", getTokenListObjFromLocalPath(pathOrUrl));

                      case 6:
                        if (!looksLikeUrl) {
                          _context3.next = 12;
                          break;
                        }

                        _context3.next = 9;
                        return getTokenListObjFromUrl(pathOrUrl);

                      case 9:
                        return _context3.abrupt("return", _context3.sent);

                      case 12:
                        throw new Error('Could not find token list');

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }()(pathOrUrl);

          case 2:
            tokenList = _context4.sent;
            isTokenList(tokenList);
            return _context4.abrupt("return", tokenList);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getTokenListObj(_x4) {
    return _ref3.apply(this, arguments);
  };
}(); // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

function isValidHttpUrl(urlString) {
  var url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
} // typeguard:


var isTokenList = function isTokenList(obj) {
  var expectedListKeys = ['name', 'timestamp', 'version', 'tokens'];
  var actualListKeys = new Set(Object.keys(obj));

  if (!expectedListKeys.every(function (key) {
    return actualListKeys.has(key);
  })) {
    throw new Error('tokenlist typeguard error: required list key not included');
  }

  var version = obj.version,
      tokens = obj.tokens;

  if (!['major', 'minor', 'patch'].every(function (key) {
    return typeof version[key] === 'number';
  })) {
    throw new Error('tokenlist typeguard error: invalid version');
  }

  if (!tokens.every(function (token) {
    var tokenKeys = new Set(Object.keys(token));
    return ['chainId', 'address', 'name', 'decimals', 'symbol'].every(function (key) {
      return tokenKeys.has(key);
    });
  })) {
    throw new Error('tokenlist typeguard error: token missing required key');
  }
};
function getRpcUrl(chainId) {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'https://cloudflare-eth.com/';

    case ChainId.OPTIMISM:
      return 'https://mainnet.optimism.io';

    case ChainId.OPTIMISTIC_KOVAN:
      return 'https://kovan.optimism.io';

    case ChainId.ARBITRUM_ONE:
      return 'https://arb1.arbitrum.io/rpc';

    case ChainId.ARBITRUM_RINKEBY:
      return 'https://rinkeby.arbitrum.io/rpc';

    case ChainId.POLYGON:
      return 'https://polygon-rpc.com/';

    case ChainId.POLYGON_MUMBAI:
      return 'https://rpc-endpoints.superfluid.dev/mumbai';
  }

  throw new Error('Unsupported ChainId');
}
function getTokenSymbolFromContract(_x6) {
  return _getTokenSymbolFromContract.apply(this, arguments);
}

function _getTokenSymbolFromContract() {
  _getTokenSymbolFromContract = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(tokenContract) {
    var symbol;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all([tokenContract.methods.symbol().call()]);

          case 2:
            symbol = _context6.sent;
            return _context6.abrupt("return", symbol);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getTokenSymbolFromContract.apply(this, arguments);
}

var _process$env, _process$env$MAINNET_;

dotenv.config();
(_process$env$MAINNET_ = (_process$env = process.env).MAINNET_RPC) != null ? _process$env$MAINNET_ : _process$env.MAINNET_RPC = /*#__PURE__*/getRpcUrl(ChainId.MAINNET);

var networkID = 42161; // ref: https://github.com/OffchainLabs/arb-token-lists/blob/master/src/lib/instantiate_bridge.ts

var getNetworkConfig = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _yield$import, getL1Network, getL2Network, MultiCaller, l2Network, l1Network, arbProvider, ethProvider, l1MultiCaller, l2MultiCaller;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@arbitrum/sdk')); });

          case 2:
            _yield$import = _context.sent;
            getL1Network = _yield$import.getL1Network;
            getL2Network = _yield$import.getL2Network;
            MultiCaller = _yield$import.MultiCaller;
            _context.next = 8;
            return getL2Network(networkID);

          case 8:
            l2Network = _context.sent;
            _context.next = 11;
            return getL1Network(l2Network.partnerChainID);

          case 11:
            l1Network = _context.sent;
            arbProvider = new ethers.providers.JsonRpcProvider(l2Network.rpcURL);
            ethProvider = new ethers.providers.JsonRpcProvider(l1Network.rpcURL);
            _context.next = 16;
            return MultiCaller.fromProvider(ethProvider);

          case 16:
            l1MultiCaller = _context.sent;
            _context.next = 19;
            return MultiCaller.fromProvider(arbProvider);

          case 19:
            l2MultiCaller = _context.sent;
            return _context.abrupt("return", {
              l1: {
                network: l1Network,
                provider: ethProvider,
                multiCaller: l1MultiCaller
              },
              l2: {
                network: l2Network,
                provider: arbProvider,
                multiCaller: l2MultiCaller
              }
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getNetworkConfig() {
    return _ref.apply(this, arguments);
  };
}();

var getL2TokenAddressesFromL1 = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(l1TokenAddresses, multiCaller, l1GatewayRouterAddress) {
    var iFace;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iFace = L1GatewayRouter__factory.L1GatewayRouter__factory.createInterface();
            _context.next = 3;
            return multiCaller.multiCall(l1TokenAddresses.map(function (addr) {
              return {
                encoder: function encoder() {
                  return iFace.encodeFunctionData('calculateL2TokenAddress', [addr]);
                },
                decoder: function decoder(returnData) {
                  return iFace.decodeFunctionResult('calculateL2TokenAddress', returnData)[0];
                },
                targetAddr: l1GatewayRouterAddress
              };
            }));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getL2TokenAddressesFromL1(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * This provider provides the l1->l2(Arbitrum) address mappings using the arbitrum SDK.
 */

var ArbitrumMappingProvider = /*#__PURE__*/function () {
  function ArbitrumMappingProvider(l1TokenList) {
    this.l1TokenList = void 0;
    this.l1TokenList = l1TokenList;
  }

  var _proto = ArbitrumMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, _yield$getNetworkConf, l1, l2, tokenAddresses, l2AddressesFromL1;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getNetworkConfig();

            case 3:
              _yield$getNetworkConf = _context.sent;
              l1 = _yield$getNetworkConf.l1;
              l2 = _yield$getNetworkConf.l2;
              tokenAddresses = this.l1TokenList.tokens.map(function (token) {
                return token.address.toLowerCase();
              });
              _context.next = 9;
              return getL2TokenAddressesFromL1(tokenAddresses, l1.multiCaller, l2.network.tokenBridge.l1GatewayRouter);

            case 9:
              l2AddressesFromL1 = _context.sent;
              tokens = tokenAddresses.reduce(function (obj, key, index) {
                var _extends2;

                return _extends({}, obj, (_extends2 = {}, _extends2[key] = l2AddressesFromL1[index], _extends2));
              }, {});
              return _context.abrupt("return", tokens);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return ArbitrumMappingProvider;
}();

var optimismTokenListURL = 'https://raw.githubusercontent.com/' + 'ethereum-optimism/ethereum-optimism.github.io/2138386277e4156d159615d1840882cecc398437/optimism.tokenlist.json';
/**
 * The Optimism L2 mapping (linked above) is manually maintained by the Optimism team.
 *
 * This provider provides the l1->l2(Optimism) token mappings.
 */

var OptimismMappingProvider = /*#__PURE__*/function () {
  function OptimismMappingProvider() {}

  var _proto = OptimismMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var tokens, optimismTokens, _iterator, _step, token, _token$extensions;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokens = {};
              _context.next = 3;
              return getTokenList(optimismTokenListURL);

            case 3:
              optimismTokens = _context.sent;

              for (_iterator = _createForOfIteratorHelperLoose(optimismTokens.tokens); !(_step = _iterator()).done;) {
                token = _step.value;

                if (token.chainId === ChainId.MAINNET) {
                  tokens[token.address.toLowerCase()] = token == null ? void 0 : (_token$extensions = token.extensions) == null ? void 0 : _token$extensions.bridgeInfo[ChainId.OPTIMISM].tokenAddress;
                }
              }

              return _context.abrupt("return", tokens);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return OptimismMappingProvider;
}();

var url = 'https://tokenmapper.api.matic.today/api/v1/mapping?';
var params = 'map_type=[%22POS%22]&chain_id=137&limit=200&offset=';
/**
 * The Polygon team manually maintains the mapping via user submissions at
 * https://mapper.polygon.technology.
 *
 * This provider provides the l1->l2(Polygon) token mappings.
 */

var PolygonMappingProvider = /*#__PURE__*/function () {
  function PolygonMappingProvider() {}

  var _proto = PolygonMappingProvider.prototype;

  _proto.provide = /*#__PURE__*/function () {
    var _provide = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var offset, tokens, response, _iterator, _step, token;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              offset = 0;
              tokens = {};

            case 2:

              _context.next = 5;
              return axios__default["default"].get("" + url + params + offset);

            case 5:
              response = _context.sent;

              if (!(response.data.message === 'success')) {
                _context.next = 11;
                break;
              }

              for (_iterator = _createForOfIteratorHelperLoose(response.data.data.mapping); !(_step = _iterator()).done;) {
                token = _step.value;
                tokens[token.root_token.toLowerCase()] = token;
              }

              if (!(response.data.data.has_next_page === true)) {
                _context.next = 11;
                break;
              }

              offset += 200;
              return _context.abrupt("continue", 2);

            case 11:
              return _context.abrupt("break", 14);

            case 14:
              return _context.abrupt("return", tokens);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function provide() {
      return _provide.apply(this, arguments);
    }

    return provide;
  }();

  return PolygonMappingProvider;
}();

var abi = [{
  constant: true,
  inputs: [],
  name: 'name',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{
    name: '',
    type: 'uint8'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}];

var web3 = /*#__PURE__*/new Web3__default["default"]();
function buildList(_x, _x2) {
  return _buildList.apply(this, arguments);
} // using a symbol lookup contract call to check whether the token exists on the L2

function _buildList() {
  _buildList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(chainId, l1TokenList) {
    var tokenAddressMap, mappedTokens, _iterator, _step, rootToken, childToken, childTokenAddress, childTokenValid, _bridgeInfo, _bridgeInfo2, toRootExtensions, toChildExtensions, rootTokenInfo, childTokenInfo, tokenList;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            web3.setProvider(getRpcUrl(chainId));
            _context.next = 3;
            return getMappingProvider(chainId, l1TokenList).provide();

          case 3:
            tokenAddressMap = _context.sent;
            mappedTokens = [];
            _iterator = _createForOfIteratorHelperLoose(l1TokenList.tokens);

          case 6:
            if ((_step = _iterator()).done) {
              _context.next = 21;
              break;
            }

            rootToken = _step.value;
            childToken = tokenAddressMap[rootToken.address.toLowerCase()];
            childTokenAddress = childToken ? ethers.ethers.utils.getAddress(typeof childToken === 'object' ? childToken.child_token : childToken) : undefined;
            _context.t0 = Boolean;
            _context.t1 = childTokenAddress && (typeof childToken === 'object' ? !childToken.deleted : true);

            if (!_context.t1) {
              _context.next = 16;
              break;
            }

            _context.next = 15;
            return hasExistingTokenContract(childTokenAddress, chainId);

          case 15:
            _context.t1 = _context.sent;

          case 16:
            _context.t2 = _context.t1;
            childTokenValid = (0, _context.t0)(_context.t2);

            if (rootToken.chainId === ChainId.MAINNET) {
              // build extension info if available
              toRootExtensions = childTokenValid ? {
                extensions: {
                  bridgeInfo: (_bridgeInfo = {}, _bridgeInfo[rootToken.chainId] = {
                    tokenAddress: ethers.ethers.utils.getAddress(rootToken.address)
                  }, _bridgeInfo)
                }
              } : {};
              toChildExtensions = childTokenValid ? {
                extensions: {
                  bridgeInfo: (_bridgeInfo2 = {}, _bridgeInfo2[chainId] = {
                    tokenAddress: childTokenAddress
                  }, _bridgeInfo2)
                }
              } : {};
              rootTokenInfo = _extends({}, rootToken, toChildExtensions);

              if (childTokenValid) {
                childTokenInfo = _extends({}, rootToken, {
                  chainId: chainId,
                  address: childTokenAddress
                }, toRootExtensions);
                mappedTokens.push(childTokenInfo);
              }

              mappedTokens.push(rootTokenInfo);
            }

          case 19:
            _context.next = 6;
            break;

          case 21:
            tokenList = {
              name: "(ChainId: " + chainId + ") " + l1TokenList.name,
              timestamp: new Date().toISOString(),
              version: l1TokenList.version,
              tokens: mappedTokens.sort(compareTokenInfos)
            };
            return _context.abrupt("return", tokenList);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _buildList.apply(this, arguments);
}

function hasExistingTokenContract(_x3, _x4) {
  return _hasExistingTokenContract.apply(this, arguments);
}

function _hasExistingTokenContract() {
  _hasExistingTokenContract = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(address, chainId) {
    var contract;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            contract = new web3.eth.Contract(abi, address);
            _context2.next = 4;
            return getTokenSymbolFromContract(contract);

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", false);

          case 9:
            return _context2.abrupt("return", true);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _hasExistingTokenContract.apply(this, arguments);
}

function getMappingProvider(chainId, l1TokenList) {
  switch (chainId) {
    case ChainId.ARBITRUM_ONE:
      return new ArbitrumMappingProvider(l1TokenList);

    case ChainId.OPTIMISM:
      return new OptimismMappingProvider();

    case ChainId.POLYGON:
      return new PolygonMappingProvider();

    default:
      throw new Error("Chain " + chainId + " not supported.");
  }
}

/**
 * Verifies that for each token with extensions.bridgeInfo defined, for every
 * chainId there exists a token with that chainId at the root-level of the
 * token list.
 *
 * @returns input TokenList if valid, throws otherwise
 */
function verifyExtensions(tokenList) {
  var _loop = function _loop() {
    var _token$extensions;

    var token = _step.value;
    if (!((_token$extensions = token.extensions) != null && _token$extensions.bridgeInfo)) return "continue"; // if has extension, make sure that:
    // 1/ other token has root-level entry
    // 2/ other root entry has extension pointing to it

    var _loop2 = function _loop2() {
      var _destToken$extensions;

      var destChainId = _Object$keys[_i];
      var destTokens = tokenList.tokens.filter(function (t) {
        return t.chainId === Number(destChainId) && t.address === // @ts-expect-error TokenList schema does not allow bridgeInfo objetcs yet
        token.extensions.bridgeInfo[destChainId].tokenAddress;
      });

      if (destTokens.length > 1) {
        throw new Error("TokenList has duplicate root-level tokens for " + token.symbol + " " + token.chainId);
      }

      var destToken = destTokens[0];

      if (!destToken) {
        throw new Error("TokenList is missing root-level TokenInfo for " + token.symbol + " " + token.chainId);
      } // ensure destToken has an extension pointing back to this


      var srcToken = // @ts-expect-error TokenList schema does not allow bridgeInfo objects yet
      (_destToken$extensions = destToken.extensions) == null ? void 0 : _destToken$extensions.bridgeInfo[token.chainId];

      if (!srcToken) {
        throw new Error("TokenList is missing root-level TokenInfo.extensions.bridgeInfo for " + token.symbol + " " + token.chainId);
      }

      if (srcToken.tokenAddress !== token.address) {
        throw new Error("TokenList has invalid root-level TokenInfo.extensions.bridgeInfo for " + token.symbol + " " + token.chainId + ". Expected " + token.address + " but got " + srcToken.tokenAddress);
      }
    };

    for (var _i = 0, _Object$keys = Object.keys(token.extensions.bridgeInfo); _i < _Object$keys.length; _i++) {
      _loop2();
    }
  };

  for (var _iterator = _createForOfIteratorHelperLoose(tokenList.tokens), _step; !(_step = _iterator()).done;) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }

  return tokenList;
}

/**
 * Adds bridgeInfo to the given token list for Optimism, Polygon and Arbitrum.
 * @param l1TokenListOrPathOrUrl
 * @returns TokenList with l2 bridgeInfo filled
 */

function chainify(_x) {
  return _chainify.apply(this, arguments);
}
/**
 * Given a network and a TokenList, returns the TokenList with `extensions` filled.
 * @param chainId chainId to operate on
 * @param l1TokenListOrPathOrUrl either an L1 TokenList object or a path/url to a TokenList
 * @returns L1 TokenList with `extensions` filled for the given network
 */

function _chainify() {
  _chainify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(l1TokenListOrPathOrUrl) {
    var l1TokenList, optimisimed, polygoned, arbified;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTokenList(l1TokenListOrPathOrUrl);

          case 2:
            l1TokenList = _context.sent;
            _context.next = 5;
            return chainifyTokenList(ChainId.OPTIMISM, l1TokenListOrPathOrUrl);

          case 5:
            optimisimed = _context.sent;
            _context.next = 8;
            return chainifyTokenList(ChainId.POLYGON, l1TokenListOrPathOrUrl);

          case 8:
            polygoned = _context.sent;
            _context.next = 11;
            return chainifyTokenList(ChainId.ARBITRUM_ONE, l1TokenListOrPathOrUrl);

          case 11:
            arbified = _context.sent;
            return _context.abrupt("return", mergeTokenLists(l1TokenList, // providing l1 first to make sure duplicated tokens resolve to this list
            mergeTokenLists(mergeTokenLists(arbified, optimisimed), polygoned)));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _chainify.apply(this, arguments);
}

function chainifyTokenList(_x2, _x3) {
  return _chainifyTokenList.apply(this, arguments);
}
/** Merges two token lists, resolving conflicts to primary list. */

function _chainifyTokenList() {
  _chainifyTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(chainId, l1TokenListOrPathOrUrl) {
    var l1TokenList, tokenList;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getTokenList(l1TokenListOrPathOrUrl);

          case 3:
            l1TokenList = _context2.sent;
            _context2.next = 6;
            return buildList(chainId, l1TokenList);

          case 6:
            tokenList = _context2.sent;
            return _context2.abrupt("return", verifyExtensions(tokenList));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            throw new Error("An error occured: " + _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _chainifyTokenList.apply(this, arguments);
}

function mergeTokenLists(primary, secondary) {
  primary = lodash.cloneDeep(primary);
  secondary = lodash.cloneDeep(secondary);
  var grouped = lodash.groupBy([].concat(secondary.tokens, primary.tokens), function (t) {
    return t.chainId + "-" + t.address.toLowerCase();
  });
  var merged = Object.values(grouped).map(function (group) {
    var _merged$extensions;

    if (group.length === 1) {
      return group[0];
    }

    var merged = lodash.merge(group[0], group[1]);

    if ((_merged$extensions = merged.extensions) != null && _merged$extensions.bridgeInfo) {
      // remove reference to self-chain from merge
      delete merged.extensions.bridgeInfo[merged.chainId];
    }

    return merged;
  });
  return lodash.cloneDeep(_extends({}, primary, {
    tokens: merged.sort(compareTokenInfos)
  }));
}

exports.chainify = chainify;
exports.chainifyTokenList = chainifyTokenList;
exports.mergeTokenLists = mergeTokenLists;
//# sourceMappingURL=token-list-bridge-utils.cjs.development.js.map
