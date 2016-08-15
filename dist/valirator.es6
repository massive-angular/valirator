var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

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

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
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

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
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

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

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

	  runtime.keys = function(object) {
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

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
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
	        return !!caught;
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
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
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

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof commonjsGlobal === "object" ? commonjsGlobal :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : commonjsGlobal
	);
	});

var runtime$1 = interopDefault(runtime);


	var require$$0$1 = Object.freeze({
	  default: runtime$1
	});

var require$$0$1 = Object.freeze({
  default: runtime$1
});

var runtimeModule = createCommonjsModule(function (module) {
	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof commonjsGlobal === "object" ? commonjsGlobal :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : commonjsGlobal;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = interopDefault(require$$0$1);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	});

var runtimeModule$1 = interopDefault(runtimeModule);


	var require$$0 = Object.freeze({
	  default: runtimeModule$1
	});

var require$$0 = Object.freeze({
  default: runtimeModule$1
});

var index = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0);
	});

var _regeneratorRuntime = interopDefault(index);

var _toInteger = createCommonjsModule(function (module) {
	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
	});

var _toInteger$1 = interopDefault(_toInteger);


	var require$$0$4 = Object.freeze({
	  default: _toInteger$1
	});

var require$$0$4 = Object.freeze({
  default: _toInteger$1
});

var _defined = createCommonjsModule(function (module) {
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};
	});

var _defined$1 = interopDefault(_defined);


	var require$$0$5 = Object.freeze({
	  default: _defined$1
	});

var require$$0$5 = Object.freeze({
  default: _defined$1
});

var _stringAt = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$0$4)
	  , defined   = interopDefault(require$$0$5);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};
	});

var _stringAt$1 = interopDefault(_stringAt);


	var require$$1 = Object.freeze({
	  default: _stringAt$1
	});

var require$$1 = Object.freeze({
  default: _stringAt$1
});

var _library = createCommonjsModule(function (module) {
	module.exports = true;
	});

var _library$1 = interopDefault(_library);


	var require$$17 = Object.freeze({
		default: _library$1
	});

var require$$17 = Object.freeze({
	default: _library$1
});

var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

var _global$1 = interopDefault(_global);


	var require$$4 = Object.freeze({
	  default: _global$1
	});

var require$$4 = Object.freeze({
  default: _global$1
});

var _core = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

var _core$1 = interopDefault(_core);
	var version = _core.version;

var require$$0$7 = Object.freeze({
		default: _core$1,
		version: version
	});

var require$$0$7 = Object.freeze({
	default: _core$1,
	version: version
});

var _aFunction = createCommonjsModule(function (module) {
	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};
	});

var _aFunction$1 = interopDefault(_aFunction);


	var require$$1$1 = Object.freeze({
	  default: _aFunction$1
	});

var require$$1$1 = Object.freeze({
  default: _aFunction$1
});

var _ctx = createCommonjsModule(function (module) {
	// optional / simple context binding
	var aFunction = interopDefault(require$$1$1);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};
	});

var _ctx$1 = interopDefault(_ctx);


	var require$$5 = Object.freeze({
	  default: _ctx$1
	});

var require$$5 = Object.freeze({
  default: _ctx$1
});

var _isObject = createCommonjsModule(function (module) {
	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	});

var _isObject$1 = interopDefault(_isObject);


	var require$$12 = Object.freeze({
	  default: _isObject$1
	});

var require$$12 = Object.freeze({
  default: _isObject$1
});

var _anObject = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	});

var _anObject$1 = interopDefault(_anObject);


	var require$$2$1 = Object.freeze({
	  default: _anObject$1
	});

var require$$2$1 = Object.freeze({
  default: _anObject$1
});

var _fails = createCommonjsModule(function (module) {
	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};
	});

var _fails$1 = interopDefault(_fails);


	var require$$0$10 = Object.freeze({
	  default: _fails$1
	});

var require$$0$10 = Object.freeze({
  default: _fails$1
});

var _descriptors = createCommonjsModule(function (module) {
	// Thank's IE8 for his funny defineProperty
	module.exports = !interopDefault(require$$0$10)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

var _descriptors$1 = interopDefault(_descriptors);


	var require$$1$2 = Object.freeze({
	  default: _descriptors$1
	});

var require$$1$2 = Object.freeze({
  default: _descriptors$1
});

var _domCreate = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$12)
	  , document = interopDefault(require$$4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};
	});

var _domCreate$1 = interopDefault(_domCreate);


	var require$$2$3 = Object.freeze({
	  default: _domCreate$1
	});

var require$$2$3 = Object.freeze({
  default: _domCreate$1
});

var _ie8DomDefine = createCommonjsModule(function (module) {
	module.exports = !interopDefault(require$$1$2) && !interopDefault(require$$0$10)(function(){
	  return Object.defineProperty(interopDefault(require$$2$3)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);


	var require$$2$2 = Object.freeze({
	  default: _ie8DomDefine$1
	});

var require$$2$2 = Object.freeze({
  default: _ie8DomDefine$1
});

var _toPrimitive = createCommonjsModule(function (module) {
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = interopDefault(require$$12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};
	});

var _toPrimitive$1 = interopDefault(_toPrimitive);


	var require$$1$3 = Object.freeze({
	  default: _toPrimitive$1
	});

var require$$1$3 = Object.freeze({
  default: _toPrimitive$1
});

var _objectDp = createCommonjsModule(function (module, exports) {
	var anObject       = interopDefault(require$$2$1)
	  , IE8_DOM_DEFINE = interopDefault(require$$2$2)
	  , toPrimitive    = interopDefault(require$$1$3)
	  , dP             = Object.defineProperty;

	exports.f = interopDefault(require$$1$2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};
	});

var _objectDp$1 = interopDefault(_objectDp);
	var f = _objectDp.f;

var require$$0$9 = Object.freeze({
	  default: _objectDp$1,
	  f: f
	});

var require$$0$9 = Object.freeze({
  default: _objectDp$1,
  f: f
});

var _propertyDesc = createCommonjsModule(function (module) {
	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};
	});

var _propertyDesc$1 = interopDefault(_propertyDesc);


	var require$$3 = Object.freeze({
	  default: _propertyDesc$1
	});

var require$$3 = Object.freeze({
  default: _propertyDesc$1
});

var _hide = createCommonjsModule(function (module) {
	var dP         = interopDefault(require$$0$9)
	  , createDesc = interopDefault(require$$3);
	module.exports = interopDefault(require$$1$2) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};
	});

var _hide$1 = interopDefault(_hide);


	var require$$0$8 = Object.freeze({
	  default: _hide$1
	});

var require$$0$8 = Object.freeze({
  default: _hide$1
});

var _export = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$4)
	  , core      = interopDefault(require$$0$7)
	  , ctx       = interopDefault(require$$5)
	  , hide      = interopDefault(require$$0$8)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;
	});

var _export$1 = interopDefault(_export);


	var require$$2 = Object.freeze({
	  default: _export$1
	});

var require$$2 = Object.freeze({
  default: _export$1
});

var _redefine = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$8);
	});

var _redefine$1 = interopDefault(_redefine);


	var require$$7 = Object.freeze({
		default: _redefine$1
	});

var require$$7 = Object.freeze({
	default: _redefine$1
});

var _has = createCommonjsModule(function (module) {
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};
	});

var _has$1 = interopDefault(_has);


	var require$$2$4 = Object.freeze({
	  default: _has$1
	});

var require$$2$4 = Object.freeze({
  default: _has$1
});

var _iterators = createCommonjsModule(function (module) {
	module.exports = {};
	});

var _iterators$1 = interopDefault(_iterators);


	var require$$1$4 = Object.freeze({
		default: _iterators$1
	});

var require$$1$4 = Object.freeze({
	default: _iterators$1
});

var _cof = createCommonjsModule(function (module) {
	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};
	});

var _cof$1 = interopDefault(_cof);


	var require$$0$11 = Object.freeze({
	  default: _cof$1
	});

var require$$0$11 = Object.freeze({
  default: _cof$1
});

var _iobject = createCommonjsModule(function (module) {
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = interopDefault(require$$0$11);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};
	});

var _iobject$1 = interopDefault(_iobject);


	var require$$1$8 = Object.freeze({
	  default: _iobject$1
	});

var require$$1$8 = Object.freeze({
  default: _iobject$1
});

var _toIobject = createCommonjsModule(function (module) {
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = interopDefault(require$$1$8)
	  , defined = interopDefault(require$$0$5);
	module.exports = function(it){
	  return IObject(defined(it));
	};
	});

var _toIobject$1 = interopDefault(_toIobject);


	var require$$1$7 = Object.freeze({
	  default: _toIobject$1
	});

var require$$1$7 = Object.freeze({
  default: _toIobject$1
});

var _toLength = createCommonjsModule(function (module) {
	// 7.1.15 ToLength
	var toInteger = interopDefault(require$$0$4)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};
	});

var _toLength$1 = interopDefault(_toLength);


	var require$$1$10 = Object.freeze({
	  default: _toLength$1
	});

var require$$1$10 = Object.freeze({
  default: _toLength$1
});

var _toIndex = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$0$4)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};
	});

var _toIndex$1 = interopDefault(_toIndex);


	var require$$0$12 = Object.freeze({
	  default: _toIndex$1
	});

var require$$0$12 = Object.freeze({
  default: _toIndex$1
});

var _arrayIncludes = createCommonjsModule(function (module) {
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = interopDefault(require$$1$7)
	  , toLength  = interopDefault(require$$1$10)
	  , toIndex   = interopDefault(require$$0$12);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};
	});

var _arrayIncludes$1 = interopDefault(_arrayIncludes);


	var require$$1$9 = Object.freeze({
	  default: _arrayIncludes$1
	});

var require$$1$9 = Object.freeze({
  default: _arrayIncludes$1
});

var _shared = createCommonjsModule(function (module) {
	var global = interopDefault(require$$4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};
	});

var _shared$1 = interopDefault(_shared);


	var require$$2$5 = Object.freeze({
	  default: _shared$1
	});

var require$$2$5 = Object.freeze({
  default: _shared$1
});

var _uid = createCommonjsModule(function (module) {
	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};
	});

var _uid$1 = interopDefault(_uid);


	var require$$1$11 = Object.freeze({
	  default: _uid$1
	});

var require$$1$11 = Object.freeze({
  default: _uid$1
});

var _sharedKey = createCommonjsModule(function (module) {
	var shared = interopDefault(require$$2$5)('keys')
	  , uid    = interopDefault(require$$1$11);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};
	});

var _sharedKey$1 = interopDefault(_sharedKey);


	var require$$0$13 = Object.freeze({
	  default: _sharedKey$1
	});

var require$$0$13 = Object.freeze({
  default: _sharedKey$1
});

var _objectKeysInternal = createCommonjsModule(function (module) {
	var has          = interopDefault(require$$2$4)
	  , toIObject    = interopDefault(require$$1$7)
	  , arrayIndexOf = interopDefault(require$$1$9)(false)
	  , IE_PROTO     = interopDefault(require$$0$13)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};
	});

var _objectKeysInternal$1 = interopDefault(_objectKeysInternal);


	var require$$1$6 = Object.freeze({
	  default: _objectKeysInternal$1
	});

var require$$1$6 = Object.freeze({
  default: _objectKeysInternal$1
});

var _enumBugKeys = createCommonjsModule(function (module) {
	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');
	});

var _enumBugKeys$1 = interopDefault(_enumBugKeys);


	var require$$0$14 = Object.freeze({
	  default: _enumBugKeys$1
	});

var require$$0$14 = Object.freeze({
  default: _enumBugKeys$1
});

var _objectKeys = createCommonjsModule(function (module) {
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = interopDefault(require$$1$6)
	  , enumBugKeys = interopDefault(require$$0$14);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};
	});

var _objectKeys$1 = interopDefault(_objectKeys);


	var require$$1$5 = Object.freeze({
	  default: _objectKeys$1
	});

var require$$1$5 = Object.freeze({
  default: _objectKeys$1
});

var _objectDps = createCommonjsModule(function (module) {
	var dP       = interopDefault(require$$0$9)
	  , anObject = interopDefault(require$$2$1)
	  , getKeys  = interopDefault(require$$1$5);

	module.exports = interopDefault(require$$1$2) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};
	});

var _objectDps$1 = interopDefault(_objectDps);


	var require$$4$2 = Object.freeze({
	  default: _objectDps$1
	});

var require$$4$2 = Object.freeze({
  default: _objectDps$1
});

var _html = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$4).document && document.documentElement;
	});

var _html$1 = interopDefault(_html);


	var require$$3$2 = Object.freeze({
		default: _html$1
	});

var require$$3$2 = Object.freeze({
	default: _html$1
});

var _objectCreate = createCommonjsModule(function (module) {
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = interopDefault(require$$2$1)
	  , dPs         = interopDefault(require$$4$2)
	  , enumBugKeys = interopDefault(require$$0$14)
	  , IE_PROTO    = interopDefault(require$$0$13)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = interopDefault(require$$2$3)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  interopDefault(require$$3$2).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};
	});

var _objectCreate$1 = interopDefault(_objectCreate);


	var require$$4$1 = Object.freeze({
	  default: _objectCreate$1
	});

var require$$4$1 = Object.freeze({
  default: _objectCreate$1
});

var _wks = createCommonjsModule(function (module) {
	var store      = interopDefault(require$$2$5)('wks')
	  , uid        = interopDefault(require$$1$11)
	  , Symbol     = interopDefault(require$$4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

var _wks$1 = interopDefault(_wks);


	var require$$0$15 = Object.freeze({
	  default: _wks$1
	});

var require$$0$15 = Object.freeze({
  default: _wks$1
});

var _setToStringTag = createCommonjsModule(function (module) {
	var def = interopDefault(require$$0$9).f
	  , has = interopDefault(require$$2$4)
	  , TAG = interopDefault(require$$0$15)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};
	});

var _setToStringTag$1 = interopDefault(_setToStringTag);


	var require$$3$3 = Object.freeze({
	  default: _setToStringTag$1
	});

var require$$3$3 = Object.freeze({
  default: _setToStringTag$1
});

var _iterCreate = createCommonjsModule(function (module) {
	'use strict';
	var create         = interopDefault(require$$4$1)
	  , descriptor     = interopDefault(require$$3)
	  , setToStringTag = interopDefault(require$$3$3)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
interopDefault(require$$0$8)(IteratorPrototype, interopDefault(require$$0$15)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};
	});

var _iterCreate$1 = interopDefault(_iterCreate);


	var require$$3$1 = Object.freeze({
	  default: _iterCreate$1
	});

var require$$3$1 = Object.freeze({
  default: _iterCreate$1
});

var _toObject = createCommonjsModule(function (module) {
	// 7.1.13 ToObject(argument)
	var defined = interopDefault(require$$0$5);
	module.exports = function(it){
	  return Object(defined(it));
	};
	});

var _toObject$1 = interopDefault(_toObject);


	var require$$1$13 = Object.freeze({
	  default: _toObject$1
	});

var require$$1$13 = Object.freeze({
  default: _toObject$1
});

var _objectGpo = createCommonjsModule(function (module) {
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = interopDefault(require$$2$4)
	  , toObject    = interopDefault(require$$1$13)
	  , IE_PROTO    = interopDefault(require$$0$13)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};
	});

var _objectGpo$1 = interopDefault(_objectGpo);


	var require$$1$12 = Object.freeze({
	  default: _objectGpo$1
	});

var require$$1$12 = Object.freeze({
  default: _objectGpo$1
});

var _iterDefine = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY        = interopDefault(require$$17)
	  , $export        = interopDefault(require$$2)
	  , redefine       = interopDefault(require$$7)
	  , hide           = interopDefault(require$$0$8)
	  , has            = interopDefault(require$$2$4)
	  , Iterators      = interopDefault(require$$1$4)
	  , $iterCreate    = interopDefault(require$$3$1)
	  , setToStringTag = interopDefault(require$$3$3)
	  , getPrototypeOf = interopDefault(require$$1$12)
	  , ITERATOR       = interopDefault(require$$0$15)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};
	});

var _iterDefine$1 = interopDefault(_iterDefine);


	var require$$0$6 = Object.freeze({
	  default: _iterDefine$1
	});

var require$$0$6 = Object.freeze({
  default: _iterDefine$1
});

var es6_string_iterator = createCommonjsModule(function (module) {
	'use strict';
	var $at  = interopDefault(require$$1)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
interopDefault(require$$0$6)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});
	});

interopDefault(es6_string_iterator);

var _addToUnscopables = createCommonjsModule(function (module) {
	module.exports = function(){ /* empty */ };
	});

var _addToUnscopables$1 = interopDefault(_addToUnscopables);


	var require$$4$3 = Object.freeze({
		default: _addToUnscopables$1
	});

var require$$4$3 = Object.freeze({
	default: _addToUnscopables$1
});

var _iterStep = createCommonjsModule(function (module) {
	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};
	});

var _iterStep$1 = interopDefault(_iterStep);


	var require$$3$4 = Object.freeze({
	  default: _iterStep$1
	});

var require$$3$4 = Object.freeze({
  default: _iterStep$1
});

var es6_array_iterator = createCommonjsModule(function (module) {
	'use strict';
	var addToUnscopables = interopDefault(require$$4$3)
	  , step             = interopDefault(require$$3$4)
	  , Iterators        = interopDefault(require$$1$4)
	  , toIObject        = interopDefault(require$$1$7);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = interopDefault(require$$0$6)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');
	});

interopDefault(es6_array_iterator);

var web_dom_iterable = createCommonjsModule(function (module) {
	var global        = interopDefault(require$$4)
	  , hide          = interopDefault(require$$0$8)
	  , Iterators     = interopDefault(require$$1$4)
	  , TO_STRING_TAG = interopDefault(require$$0$15)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}
	});

interopDefault(web_dom_iterable);

var _classof = createCommonjsModule(function (module) {
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = interopDefault(require$$0$11)
	  , TAG = interopDefault(require$$0$15)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};
	});

var _classof$1 = interopDefault(_classof);


	var require$$3$5 = Object.freeze({
	  default: _classof$1
	});

var require$$3$5 = Object.freeze({
  default: _classof$1
});

var _anInstance = createCommonjsModule(function (module) {
	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};
	});

var _anInstance$1 = interopDefault(_anInstance);


	var require$$10 = Object.freeze({
	  default: _anInstance$1
	});

var require$$10 = Object.freeze({
  default: _anInstance$1
});

var _iterCall = createCommonjsModule(function (module) {
	// call something on iterator step with safe closing on error
	var anObject = interopDefault(require$$2$1);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};
	});

var _iterCall$1 = interopDefault(_iterCall);


	var require$$4$4 = Object.freeze({
	  default: _iterCall$1
	});

var require$$4$4 = Object.freeze({
  default: _iterCall$1
});

var _isArrayIter = createCommonjsModule(function (module) {
	// check on default Array iterator
	var Iterators  = interopDefault(require$$1$4)
	  , ITERATOR   = interopDefault(require$$0$15)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};
	});

var _isArrayIter$1 = interopDefault(_isArrayIter);


	var require$$3$6 = Object.freeze({
	  default: _isArrayIter$1
	});

var require$$3$6 = Object.freeze({
  default: _isArrayIter$1
});

var core_getIteratorMethod = createCommonjsModule(function (module) {
	var classof   = interopDefault(require$$3$5)
	  , ITERATOR  = interopDefault(require$$0$15)('iterator')
	  , Iterators = interopDefault(require$$1$4);
	module.exports = interopDefault(require$$0$7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};
	});

var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);


	var require$$0$16 = Object.freeze({
	  default: core_getIteratorMethod$1
	});

var require$$0$16 = Object.freeze({
  default: core_getIteratorMethod$1
});

var _forOf = createCommonjsModule(function (module) {
	var ctx         = interopDefault(require$$5)
	  , call        = interopDefault(require$$4$4)
	  , isArrayIter = interopDefault(require$$3$6)
	  , anObject    = interopDefault(require$$2$1)
	  , toLength    = interopDefault(require$$1$10)
	  , getIterFn   = interopDefault(require$$0$16)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;
	});

var _forOf$1 = interopDefault(_forOf);


	var require$$9 = Object.freeze({
	  default: _forOf$1
	});

var require$$9 = Object.freeze({
  default: _forOf$1
});

var _speciesConstructor = createCommonjsModule(function (module) {
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = interopDefault(require$$2$1)
	  , aFunction = interopDefault(require$$1$1)
	  , SPECIES   = interopDefault(require$$0$15)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};
	});

var _speciesConstructor$1 = interopDefault(_speciesConstructor);


	var require$$8 = Object.freeze({
	  default: _speciesConstructor$1
	});

var require$$8 = Object.freeze({
  default: _speciesConstructor$1
});

var _invoke = createCommonjsModule(function (module) {
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};
	});

var _invoke$1 = interopDefault(_invoke);


	var require$$4$5 = Object.freeze({
	  default: _invoke$1
	});

var require$$4$5 = Object.freeze({
  default: _invoke$1
});

var _task = createCommonjsModule(function (module) {
	var ctx                = interopDefault(require$$5)
	  , invoke             = interopDefault(require$$4$5)
	  , html               = interopDefault(require$$3$2)
	  , cel                = interopDefault(require$$2$3)
	  , global             = interopDefault(require$$4)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(interopDefault(require$$0$11)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};
	});

var _task$1 = interopDefault(_task);
	var set = _task.set;
	var clear = _task.clear;

var require$$1$14 = Object.freeze({
	  default: _task$1,
	  set: set,
	  clear: clear
	});

var require$$1$14 = Object.freeze({
  default: _task$1,
  set: set,
  clear: clear
});

var _microtask = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$4)
	  , macrotask = interopDefault(require$$1$14).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = interopDefault(require$$0$11)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};
	});

var _microtask$1 = interopDefault(_microtask);


	var require$$6 = Object.freeze({
	  default: _microtask$1
	});

var require$$6 = Object.freeze({
  default: _microtask$1
});

var _redefineAll = createCommonjsModule(function (module) {
	var hide = interopDefault(require$$0$8);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};
	});

var _redefineAll$1 = interopDefault(_redefineAll);


	var require$$4$6 = Object.freeze({
	  default: _redefineAll$1
	});

var require$$4$6 = Object.freeze({
  default: _redefineAll$1
});

var _setSpecies = createCommonjsModule(function (module) {
	'use strict';
	var global      = interopDefault(require$$4)
	  , core        = interopDefault(require$$0$7)
	  , dP          = interopDefault(require$$0$9)
	  , DESCRIPTORS = interopDefault(require$$1$2)
	  , SPECIES     = interopDefault(require$$0$15)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};
	});

var _setSpecies$1 = interopDefault(_setSpecies);


	var require$$2$6 = Object.freeze({
	  default: _setSpecies$1
	});

var require$$2$6 = Object.freeze({
  default: _setSpecies$1
});

var _iterDetect = createCommonjsModule(function (module) {
	var ITERATOR     = interopDefault(require$$0$15)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};
	});

var _iterDetect$1 = interopDefault(_iterDetect);


	var require$$0$17 = Object.freeze({
	  default: _iterDetect$1
	});

var require$$0$17 = Object.freeze({
  default: _iterDetect$1
});

var es6_promise = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY            = interopDefault(require$$17)
	  , global             = interopDefault(require$$4)
	  , ctx                = interopDefault(require$$5)
	  , classof            = interopDefault(require$$3$5)
	  , $export            = interopDefault(require$$2)
	  , isObject           = interopDefault(require$$12)
	  , aFunction          = interopDefault(require$$1$1)
	  , anInstance         = interopDefault(require$$10)
	  , forOf              = interopDefault(require$$9)
	  , speciesConstructor = interopDefault(require$$8)
	  , task               = interopDefault(require$$1$14).set
	  , microtask          = interopDefault(require$$6)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[interopDefault(require$$0$15)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = interopDefault(require$$4$6)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
interopDefault(require$$3$3)($Promise, PROMISE);
interopDefault(require$$2$6)(PROMISE);
	Wrapper = interopDefault(require$$0$7)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$0$17)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});
	});

interopDefault(es6_promise);

var promise$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$7).Promise;
	});

var promise$3 = interopDefault(promise$2);


	var require$$0$3 = Object.freeze({
		default: promise$3
	});

var require$$0$3 = Object.freeze({
	default: promise$3
});

var promise = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$3), __esModule: true };
	});

var promise$1 = interopDefault(promise);


	var require$$0$2 = Object.freeze({
		default: promise$1
	});

var require$$0$2 = Object.freeze({
	default: promise$1
});

var asyncToGenerator = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _promise = interopDefault(require$$0$2);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
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
	          return _promise2.default.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};
	});

var _asyncToGenerator = interopDefault(asyncToGenerator);

function isType(obj, typeStr) {
	  return Object.prototype.toString.call(obj) === typeStr;
	}

	function isObject(obj) {
	  return isType(obj, '[object Object]');
	}

	function isArray(obj) {
	  return isType(obj, '[object Array]');
	}

	function isFunction(obj) {
	  return isType(obj, '[object Function]');
	}

	function isString(obj) {
	  return isType(obj, '[object String]');
	}

	function isDate(obj) {
	  return isType(obj, '[object Date]');
	}

	function isNumber(obj) {
	  return isType(obj, '[object Number]') && !isNaN(obj);
	}

	function isBoolean(obj) {
	  return isType(obj, '[object Boolean]');
	}

	function noop() {}

	function getObjectOverride(context, prop) {
	  if (!context) {
	    return false;
	  }

	  return isFunction(context[prop]) ? context[prop] : getObjectOverride(context.__proto__, prop);
	}

	var formatMessage = function () {	  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? 'No default message for rule "%{rule}"' : arguments[0];
	    var actual = arguments[1];
	    var expected = arguments[2];
	    var property = arguments[3];
	    var obj = arguments[4];
	    var rule = arguments[5];
	    var lookup;
	    return _regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            lookup = {
	              actual: actual,
	              expected: expected,
	              property: property,
	              rule: rule
	            };

	            if (!isFunction(message)) {
	              _context.next = 7;
	              break;
	            }

	            _context.next = 4;
	            return message(actual, expected, property, obj);

	          case 4:
	            _context.t0 = _context.sent;
	            _context.next = 8;
	            break;

	          case 7:
	            _context.t0 = message.replace(/%\{([a-z]+)\}/ig, function (_, match) {
	              return lookup[match.toLowerCase()] || '';
	            });

	          case 8:
	            return _context.abrupt('return', _context.t0);

	          case 9:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function formatMessage(_x, _x2, _x3, _x4, _x5, _x6) {
	    return _ref.apply(this, arguments);
	  };
	}();

var es6_object_defineProperty = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$2);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !interopDefault(require$$1$2), 'Object', {defineProperty: interopDefault(require$$0$9).f});
	});

interopDefault(es6_object_defineProperty);

var defineProperty$1 = createCommonjsModule(function (module) {
	var $Object = interopDefault(require$$0$7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};
	});

var defineProperty$2 = interopDefault(defineProperty$1);


	var require$$0$18 = Object.freeze({
	  default: defineProperty$2
	});

var require$$0$18 = Object.freeze({
  default: defineProperty$2
});

var defineProperty = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$18), __esModule: true };
	});

var _Object$defineProperty = interopDefault(defineProperty);

var rulesHolder = {};

	function registerRule(name, rule, message) {
	  if (!Object.hasOwnProperty(name)) {
	    _Object$defineProperty(rulesHolder, name, {
	      value: {
	        name: name,
	        message: message,
	        check: rule
	      }
	    });
	  } else {
	    throw Error('Rule already defined');
	  }
	}

	function hasRule(name) {
	  return rulesHolder.hasOwnProperty(name);
	}

	function getRule(name) {	  return rulesHolder[name] || {};
	}

var checkRule = function () {
	  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(obj, property, schema, schemaRules, schemaMessages, errors, rule) {
	    var _getRule, defaultRule, defaultMessage, actual, expected, schemaRule, schemaMessage, isValid, subSchemaProperties, ln, i, item;

	    return _regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _getRule = getRule(rule);
	            defaultRule = _getRule.check;
	            defaultMessage = _getRule.message;
	            actual = obj[property];
	            expected = schemaRules[rule];
	            schemaRule = getObjectOverride(schemaRules, rule) || schemaRules[rule];
	            schemaMessage = getObjectOverride(schemaMessages, rule) || schemaMessages[rule];
	            _context.next = 9;
	            return (isFunction(schemaRule) ? schemaRule : defaultRule || noop)(actual, expected, property, obj, schema, defaultRule);

	          case 9:
	            isValid = _context.sent;

	            if (!(isValid !== true)) {
	              _context.next = 14;
	              break;
	            }

	            _context.next = 13;
	            return formatMessage(schemaMessage || defaultMessage, actual, expected, property, obj, rule);

	          case 13:
	            errors[rule] = _context.sent;

	          case 14:
	            subSchemaProperties = schema[property].properties;

	            if (!subSchemaProperties) {
	              _context.next = 31;
	              break;
	            }

	            if (!isObject(actual)) {
	              _context.next = 21;
	              break;
	            }

	            _context.next = 19;
	            return validateSchema(actual, subSchemaProperties, schemaRules, schemaMessages, errors);

	          case 19:
	            _context.next = 31;
	            break;

	          case 21:
	            if (!isArray(actual)) {
	              _context.next = 31;
	              break;
	            }

	            ln = actual.length;
	            i = 0;

	          case 24:
	            if (!(i < ln)) {
	              _context.next = 31;
	              break;
	            }

	            item = actual[i];
	            _context.next = 28;
	            return validateSchema(item, subSchemaProperties, schemaRules, schemaMessages, errors[i] || (errors[i] = {}));

	          case 28:
	            i++;
	            _context.next = 24;
	            break;

	          case 31:
	            return _context.abrupt('return', errors);

	          case 32:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function checkRule(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var checkProperty = function () {
	  var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(obj, schema, schemaRules, schemaMessages, errors, property) {
	    var _schema$property, _schema$property$rule, propertyRules, _schema$property$mess, propertyMessages, rule;

	    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _schema$property = schema[property];
	            _schema$property$rule = _schema$property.rules;
	            propertyRules = _schema$property$rule === undefined ? {} : _schema$property$rule;
	            _schema$property$mess = _schema$property.messages;
	            propertyMessages = _schema$property$mess === undefined ? {} : _schema$property$mess;


	            propertyRules.__proto__ = schemaRules;
	            propertyMessages.__proto__ = schemaMessages;

	            _context2.t0 = _regeneratorRuntime.keys(propertyRules);

	          case 8:
	            if ((_context2.t1 = _context2.t0()).done) {
	              _context2.next = 15;
	              break;
	            }

	            rule = _context2.t1.value;

	            if (!propertyRules.hasOwnProperty(rule)) {
	              _context2.next = 13;
	              break;
	            }

	            _context2.next = 13;
	            return checkRule(obj, property, schema, propertyRules, propertyMessages, errors[property] || (errors[property] = {}), rule);

	          case 13:
	            _context2.next = 8;
	            break;

	          case 15:
	            return _context2.abrupt('return', errors);

	          case 16:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function checkProperty(_x8, _x9, _x10, _x11, _x12, _x13) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var validateSchema = function () {
	  var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(obj, schemaProperties, schemaRules, schemaMessages, errors) {
	    var property;
	    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.t0 = _regeneratorRuntime.keys(schemaProperties);

	          case 1:
	            if ((_context3.t1 = _context3.t0()).done) {
	              _context3.next = 8;
	              break;
	            }

	            property = _context3.t1.value;

	            if (!schemaProperties.hasOwnProperty(property)) {
	              _context3.next = 6;
	              break;
	            }

	            _context3.next = 6;
	            return checkProperty(obj, schemaProperties, schemaRules, schemaMessages, errors, property);

	          case 6:
	            _context3.next = 1;
	            break;

	          case 8:
	            return _context3.abrupt('return', errors);

	          case 9:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function validateSchema(_x14, _x15, _x16, _x17, _x18) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	var validate = function () {	  var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(obj, schema) {
	    var _schema$rules, schemaRules, _schema$messages, schemaMessages, _schema$properties, schemaProperties;

	    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _schema$rules = schema.rules;
	            schemaRules = _schema$rules === undefined ? {} : _schema$rules;
	            _schema$messages = schema.messages;
	            schemaMessages = _schema$messages === undefined ? {} : _schema$messages;
	            _schema$properties = schema.properties;
	            schemaProperties = _schema$properties === undefined ? {} : _schema$properties;
	            _context4.next = 8;
	            return validateSchema(obj, schemaProperties, schemaRules, schemaMessages, {});

	          case 8:
	            return _context4.abrupt('return', _context4.sent);

	          case 9:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function validate(_x19, _x20) {
	    return _ref4.apply(this, arguments);
	  };
	}();

function allowEmptyRule(value, allowEmpty) {	  return !!value || !!allowEmpty && value === '';
	}

	registerRule('allowEmpty', allowEmptyRule, 'must not be empty');

function divisibleByRule(value, divisibleBy) {	  var multiplier = Math.max((value - Math.floor(value)).toString().length - 2, (divisibleBy - Math.floor(divisibleBy)).toString().length - 2);

	  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

	  return value * multiplier % (divisibleBy * multiplier) === 0;
	}

	registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');

function enumRule(value, e) {	  return e && e.indexOf(value) !== -1;
	}

	registerRule('enum', enumRule, 'must be present in given enumerator');

function maxRule(value, max) {	  return value <= max;
	}

	registerRule('max', maxRule, 'must be less than or equal to %{expected}');

function maxItemsRule(value, minItems) {	  return Array.isArray(value) && value.length <= minItems;
	}

	registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');

function maxLengthRule(value, maxLength) {	  return value && value.length <= maxLength;
	}

	registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');

function exclusiveMaxRule(value, exclusiveMax) {	  return value < exclusiveMax;
	}

	registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');

function minRule(value, min) {	  return value >= min;
	}

	registerRule('min', minRule, 'must be greater than or equal to %{expected}');

function minItemsRule(value, minItems) {	  return Array.isArray(value) && value.length >= minItems;
	}

	registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');

function minLengthRule(value, minLength) {	  return value && value.length >= minLength;
	}

	registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');

function exclusiveMinRule(value, exclusiveMin) {	  return value > exclusiveMin;
	}

	registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');

function patternRule(value, pattern) {	  pattern = isString(value) ? new RegExp(pattern) : pattern;

	  return pattern.test(value);
	}

	registerRule('pattern', patternRule, 'invalid input');

function requiredRule(value, required) {	  return !!value || !required;
	}

	registerRule('required', requiredRule, 'is required');

function typeRule(value, type) {	  switch (type) {
	    case 'boolean':
	      return isBoolean(value);

	    case 'number':
	      return isNumber(value);

	    case 'string':
	      return isString(value);

	    case 'date':
	      return isDate(value);

	    case 'object':
	      return isObject(value);

	    case 'array':
	      return isArray(value);

	    default:
	      return true;
	  }
	}

	registerRule('type', typeRule, 'must be of %{expected} type');

var stringify$1 = createCommonjsModule(function (module) {
	var core  = interopDefault(require$$0$7)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};
	});

var stringify$2 = interopDefault(stringify$1);


	var require$$0$19 = Object.freeze({
	  default: stringify$2
	});

var require$$0$19 = Object.freeze({
  default: stringify$2
});

var stringify = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$19), __esModule: true };
	});

var _JSON$stringify = interopDefault(stringify);

function uniqueItemsRule(value, uniqueItems) {	  if (!uniqueItems) {
	    return true;
	  }

	  var hash = {};

	  for (var i = 0, l = value.length; i < l; i++) {
	    var key = _JSON$stringify(value[i]);
	    if (hash[key]) {
	      return false;
	    }

	    hash[key] = true;
	  }

	  return true;
	}

	registerRule('uniqueItems', uniqueItemsRule, 'must hold a unique set of values');

export { isType, isObject, isArray, isFunction, isString, isDate, isNumber, isBoolean, noop, getObjectOverride, formatMessage, registerRule, hasRule, getRule, validate, allowEmptyRule, divisibleByRule, enumRule, maxRule, maxItemsRule, maxLengthRule, exclusiveMaxRule, minRule, minItemsRule, minLengthRule, exclusiveMinRule, patternRule, requiredRule, typeRule, uniqueItemsRule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vc3JjL2NvcmUvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi9zcmMvY29yZS9ydWxlcy5qcyIsIi4uL3NyYy9jb3JlL3ZhbGlkYXRvci5qcyIsIi4uL3NyYy9ydWxlcy9hbGxvd0VtcHR5UnVsZS5qcyIsIi4uL3NyYy9ydWxlcy9kaXZpc2libGVCeVJ1bGUuanMiLCIuLi9zcmMvcnVsZXMvZW51bVJ1bGUuanMiLCIuLi9zcmMvcnVsZXMvbWF4UnVsZS5qcyIsIi4uL3NyYy9ydWxlcy9tYXhJdGVtc1J1bGUuanMiLCIuLi9zcmMvcnVsZXMvbWF4TGVuZ3RoUnVsZS5qcyIsIi4uL3NyYy9ydWxlcy9leGNsdXNpdmVNYXhSdWxlLmpzIiwiLi4vc3JjL3J1bGVzL21pblJ1bGUuanMiLCIuLi9zcmMvcnVsZXMvbWluSXRlbXNSdWxlLmpzIiwiLi4vc3JjL3J1bGVzL21pbkxlbmd0aFJ1bGUuanMiLCIuLi9zcmMvcnVsZXMvZXhjbHVzaXZlTWluUnVsZS5qcyIsIi4uL3NyYy9ydWxlcy9wYXR0ZXJuUnVsZS5qcyIsIi4uL3NyYy9ydWxlcy9yZXF1aXJlZFJ1bGUuanMiLCIuLi9zcmMvcnVsZXMvdHlwZVJ1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qcyIsIi4uL3NyYy9ydWxlcy91bmlxdWVJdGVtc1J1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9IEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudGAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuIFNvbWUgbWF5IGNvbnNpZGVyIHRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIHRvb1xuICAvLyBjdXRlc3ksIGJ1dCB0aGV5IGFyZSBjdXJtdWRnZW9ucy5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBhcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4gIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAvLyB1c2UgaW5kaXJlY3QgZXZhbCAod2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kpLlxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXNcbik7XG4iLCIvLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPVxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXM7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTsiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn0iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjsiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59OyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCJ2YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2h0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZShoZWFkKXtcbiAgICAgIGZuICAgPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICBpZihoZWFkKW5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmKGlzTm9kZSl7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxuICB9IGVsc2UgaWYoT2JzZXJ2ZXIpe1xuICAgIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKXtcbiAgICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gICAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmKCFoZWFkKXtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07IiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXtcbiAgICBpZihzYWZlICYmIHRhcmdldFtrZXldKXRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07IiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNsYXNzb2YgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbkluc3RhbmNlICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCB0YXNrICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgbWljcm90YXNrICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKVxuICAsIFBST01JU0UgICAgICAgICAgICA9ICdQcm9taXNlJ1xuICAsIFR5cGVFcnJvciAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsICRQcm9taXNlICAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICAgICAgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBlbXB0eSAgICAgICAgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgSW50ZXJuYWwsIEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgICAgID0gJFByb21pc2UucmVzb2x2ZSgxKVxuICAgICAgLCBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24oZXhlYyl7IGV4ZWMoZW1wdHksIGVtcHR5KTsgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyB3aXRoIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgcmV0dXJuIGEgPT09IGIgfHwgYSA9PT0gJFByb21pc2UgJiYgYiA9PT0gV3JhcHBlcjtcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgcmV0dXJuIHNhbWVDb25zdHJ1Y3RvcigkUHJvbWlzZSwgQylcbiAgICA/IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgIDogbmV3IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24oJCRyZXNvbHZlLCAkJHJlamVjdCl7XG4gICAgaWYocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCAgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocHJvbWlzZSwgaXNSZWplY3Qpe1xuICBpZihwcm9taXNlLl9uKXJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgb2sgICAgPSBwcm9taXNlLl9zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdGlvbil7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsXG4gICAgICAgICwgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmVcbiAgICAgICAgLCByZWplY3QgID0gcmVhY3Rpb24ucmVqZWN0XG4gICAgICAgICwgZG9tYWluICA9IHJlYWN0aW9uLmRvbWFpblxuICAgICAgICAsIHJlc3VsdCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICAgIGlmKCFvayl7XG4gICAgICAgICAgICBpZihwcm9taXNlLl9oID09IDIpb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoaGFuZGxlciA9PT0gdHJ1ZSlyZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKW9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIGFicnVwdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYoYWJydXB0KXRocm93IGFicnVwdC5lcnJvcjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIGlmKHByb21pc2UuX2ggPT0gMSlyZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fY1xuICAgICwgaSAgICAgPSAwXG4gICAgLCByZWFjdGlvbjtcbiAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSl7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKXJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZihpc05vZGUpe1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKXtcbiAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdn0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYoIXByb21pc2UuX2EpcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHByb21pc2UgPT09IHZhbHVlKXRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7X3c6IHByb21pc2UsIF9kOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe193OiBwcm9taXNlLCBfZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciByZWFjdGlvbiAgICA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgICAgID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsICAgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9hKXRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9zKW5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbigpe1xuICAgIHZhciBwcm9taXNlICA9IG5ldyBJbnRlcm5hbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7UHJvbWlzZTogJFByb21pc2V9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlamVjdCAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICAvLyBpbnN0YW5jZW9mIGluc3RlYWQgb2YgaW50ZXJuYWwgc2xvdCBjaGVjayBiZWNhdXNlIHdlIHNob3VsZCBmaXggaXQgd2l0aG91dCByZXBsYWNlbWVudCBuYXRpdmUgUHJvbWlzZSBjb3JlXG4gICAgaWYoeCBpbnN0YW5jZW9mICRQcm9taXNlICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKSlyZXR1cm4geDtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVzb2x2ZSAgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgJCRyZXNvbHZlKHgpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVzb2x2ZSAgICA9IGNhcGFiaWxpdHkucmVzb2x2ZVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZXMgICAgPSBbXVxuICAgICAgICAsIGluZGV4ICAgICA9IDBcbiAgICAgICAgLCByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgdmFyICRpbmRleCAgICAgICAgPSBpbmRleCsrXG4gICAgICAgICAgLCBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgaWYoYWxyZWFkeUNhbGxlZClyZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCAgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Byb21pc2UgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9wcm9taXNlXCIpO1xuXG52YXIgX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgX3Byb21pc2UyLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcHJvbWlzZTIuZGVmYXVsdC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcChcInRocm93XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIpO1xuICAgIH0pO1xuICB9O1xufTsiLCJleHBvcnQgZnVuY3Rpb24gaXNUeXBlKG9iaiwgdHlwZVN0cikge1xuICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSB0eXBlU3RyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gaXNUeXBlKG9iaiwgJ1tvYmplY3QgT2JqZWN0XScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgcmV0dXJuIGlzVHlwZShvYmosICdbb2JqZWN0IEFycmF5XScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIGlzVHlwZShvYmosICdbb2JqZWN0IEZ1bmN0aW9uXScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gIHJldHVybiBpc1R5cGUob2JqLCAnW29iamVjdCBTdHJpbmddJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUob2JqKSB7XG4gIHJldHVybiBpc1R5cGUob2JqLCAnW29iamVjdCBEYXRlXScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XG4gIHJldHVybiBpc1R5cGUob2JqLCAnW29iamVjdCBOdW1iZXJdJykgJiYgIWlzTmFOKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKSB7XG4gIHJldHVybiBpc1R5cGUob2JqLCAnW29iamVjdCBCb29sZWFuXScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdE92ZXJyaWRlKGNvbnRleHQsIHByb3ApIHtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzRnVuY3Rpb24oY29udGV4dFtwcm9wXSkgPyBjb250ZXh0W3Byb3BdIDogZ2V0T2JqZWN0T3ZlcnJpZGUoY29udGV4dC5fX3Byb3RvX18sIHByb3ApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShtZXNzYWdlID0gJ05vIGRlZmF1bHQgbWVzc2FnZSBmb3IgcnVsZSBcIiV7cnVsZX1cIicsIGFjdHVhbCwgZXhwZWN0ZWQsIHByb3BlcnR5LCBvYmosIHJ1bGUpIHtcbiAgdmFyIGxvb2t1cCA9IHtcbiAgICBhY3R1YWwsXG4gICAgZXhwZWN0ZWQsXG4gICAgcHJvcGVydHksXG4gICAgcnVsZVxuICB9O1xuXG4gIHJldHVybiBpc0Z1bmN0aW9uKG1lc3NhZ2UpXG4gICAgPyBhd2FpdCBtZXNzYWdlKGFjdHVhbCwgZXhwZWN0ZWQsIHByb3BlcnR5LCBvYmopXG4gICAgOiBtZXNzYWdlLnJlcGxhY2UoLyVcXHsoW2Etel0rKVxcfS9pZywgZnVuY3Rpb24gKF8sIG1hdGNoKSB7IHJldHVybiBsb29rdXBbbWF0Y2gudG9Mb3dlckNhc2UoKV0gfHwgJyc7IH0pO1xufVxuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibGV0IHJ1bGVzSG9sZGVyID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclJ1bGUobmFtZSwgcnVsZSwgbWVzc2FnZSkge1xuICBpZiAoIU9iamVjdC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShydWxlc0hvbGRlciwgbmFtZSwge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgY2hlY2s6IHJ1bGVcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBFcnJvcignUnVsZSBhbHJlYWR5IGRlZmluZWQnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzUnVsZShuYW1lKSB7XG4gIHJldHVybiBydWxlc0hvbGRlci5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJ1bGUobmFtZSkge1xuICByZXR1cm4gcnVsZXNIb2xkZXJbbmFtZV0gfHwge307XG59XG4iLCJpbXBvcnQgeyBnZXRSdWxlIH0gZnJvbSAnLi9ydWxlcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNBcnJheSwgbm9vcCwgZ2V0T2JqZWN0T3ZlcnJpZGUsIGZvcm1hdE1lc3NhZ2UgfSBmcm9tICcuL3V0aWxzJztcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tSdWxlKG9iaiwgcHJvcGVydHksIHNjaGVtYSwgc2NoZW1hUnVsZXMsIHNjaGVtYU1lc3NhZ2VzLCBlcnJvcnMsIHJ1bGUpIHtcbiAgY29uc3Qge1xuICAgIGNoZWNrOiBkZWZhdWx0UnVsZSxcbiAgICBtZXNzYWdlOiBkZWZhdWx0TWVzc2FnZVxuICB9ID0gZ2V0UnVsZShydWxlKTtcblxuICBjb25zdCBhY3R1YWwgPSBvYmpbcHJvcGVydHldO1xuICBjb25zdCBleHBlY3RlZCA9IHNjaGVtYVJ1bGVzW3J1bGVdO1xuICBjb25zdCBzY2hlbWFSdWxlID0gZ2V0T2JqZWN0T3ZlcnJpZGUoc2NoZW1hUnVsZXMsIHJ1bGUpIHx8IHNjaGVtYVJ1bGVzW3J1bGVdO1xuICBjb25zdCBzY2hlbWFNZXNzYWdlID0gZ2V0T2JqZWN0T3ZlcnJpZGUoc2NoZW1hTWVzc2FnZXMsIHJ1bGUpIHx8IHNjaGVtYU1lc3NhZ2VzW3J1bGVdO1xuXG4gIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCAoaXNGdW5jdGlvbihzY2hlbWFSdWxlKSA/IHNjaGVtYVJ1bGUgOiBkZWZhdWx0UnVsZSB8fCBub29wKShhY3R1YWwsIGV4cGVjdGVkLCBwcm9wZXJ0eSwgb2JqLCBzY2hlbWEsIGRlZmF1bHRSdWxlKTtcblxuICBpZiAoaXNWYWxpZCAhPT0gdHJ1ZSkge1xuICAgIGVycm9yc1tydWxlXSA9IGF3YWl0IGZvcm1hdE1lc3NhZ2Uoc2NoZW1hTWVzc2FnZSB8fCBkZWZhdWx0TWVzc2FnZSwgYWN0dWFsLCBleHBlY3RlZCwgcHJvcGVydHksIG9iaiwgcnVsZSk7XG4gIH1cblxuICBjb25zdCB7XG4gICAgcHJvcGVydGllczogc3ViU2NoZW1hUHJvcGVydGllc1xuICB9ICA9IHNjaGVtYVtwcm9wZXJ0eV07XG5cbiAgaWYgKHN1YlNjaGVtYVByb3BlcnRpZXMpIHtcbiAgICBpZiAoaXNPYmplY3QoYWN0dWFsKSkge1xuICAgICAgYXdhaXQgdmFsaWRhdGVTY2hlbWEoYWN0dWFsLCBzdWJTY2hlbWFQcm9wZXJ0aWVzLCBzY2hlbWFSdWxlcywgc2NoZW1hTWVzc2FnZXMsIGVycm9ycyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGFjdHVhbCkpIHtcbiAgICAgIGNvbnN0IGxuID0gYWN0dWFsLmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBhY3R1YWxbaV07XG5cbiAgICAgICAgYXdhaXQgdmFsaWRhdGVTY2hlbWEoaXRlbSwgc3ViU2NoZW1hUHJvcGVydGllcywgc2NoZW1hUnVsZXMsIHNjaGVtYU1lc3NhZ2VzLCBlcnJvcnNbaV0gfHwgKGVycm9yc1tpXSA9IHt9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9ycztcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tQcm9wZXJ0eShvYmosIHNjaGVtYSwgc2NoZW1hUnVsZXMsIHNjaGVtYU1lc3NhZ2VzLCBlcnJvcnMsIHByb3BlcnR5KSB7XG4gIGNvbnN0IHtcbiAgICBydWxlczogcHJvcGVydHlSdWxlcyA9IHt9LFxuICAgIG1lc3NhZ2VzOiBwcm9wZXJ0eU1lc3NhZ2VzID0ge31cbiAgfSA9IHNjaGVtYVtwcm9wZXJ0eV07XG5cbiAgcHJvcGVydHlSdWxlcy5fX3Byb3RvX18gPSBzY2hlbWFSdWxlcztcbiAgcHJvcGVydHlNZXNzYWdlcy5fX3Byb3RvX18gPSBzY2hlbWFNZXNzYWdlcztcblxuICBmb3IgKGNvbnN0IHJ1bGUgaW4gcHJvcGVydHlSdWxlcykge1xuICAgIGlmIChwcm9wZXJ0eVJ1bGVzLmhhc093blByb3BlcnR5KHJ1bGUpKSB7XG4gICAgICBhd2FpdCBjaGVja1J1bGUob2JqLCBwcm9wZXJ0eSwgc2NoZW1hLCBwcm9wZXJ0eVJ1bGVzLCBwcm9wZXJ0eU1lc3NhZ2VzLCBlcnJvcnNbcHJvcGVydHldIHx8IChlcnJvcnNbcHJvcGVydHldID0ge30pLCBydWxlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZXJyb3JzO1xufVxuXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNjaGVtYShvYmosIHNjaGVtYVByb3BlcnRpZXMsIHNjaGVtYVJ1bGVzLCBzY2hlbWFNZXNzYWdlcywgZXJyb3JzKSB7XG4gIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc2NoZW1hUHJvcGVydGllcykge1xuICAgIGlmIChzY2hlbWFQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgYXdhaXQgY2hlY2tQcm9wZXJ0eShvYmosIHNjaGVtYVByb3BlcnRpZXMsIHNjaGVtYVJ1bGVzLCBzY2hlbWFNZXNzYWdlcywgZXJyb3JzLCBwcm9wZXJ0eSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9ycztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlKG9iaiwgc2NoZW1hKSB7XG4gIGNvbnN0IHtcbiAgICBydWxlczogc2NoZW1hUnVsZXMgPSB7fSxcbiAgICBtZXNzYWdlczogc2NoZW1hTWVzc2FnZXMgPSB7fSxcbiAgICBwcm9wZXJ0aWVzOiBzY2hlbWFQcm9wZXJ0aWVzID0ge30sXG4gIH0gPSBzY2hlbWE7XG5cbiAgcmV0dXJuIGF3YWl0IHZhbGlkYXRlU2NoZW1hKG9iaiwgc2NoZW1hUHJvcGVydGllcywgc2NoZW1hUnVsZXMsIHNjaGVtYU1lc3NhZ2VzLCB7fSk7XG59XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93RW1wdHlSdWxlKHZhbHVlLCBhbGxvd0VtcHR5KSB7XG4gIHJldHVybiAhIXZhbHVlIHx8ICghIWFsbG93RW1wdHkgJiYgdmFsdWUgPT09ICcnKTtcbn1cblxucmVnaXN0ZXJSdWxlKCdhbGxvd0VtcHR5JywgYWxsb3dFbXB0eVJ1bGUsICdtdXN0IG5vdCBiZSBlbXB0eScpO1xuIiwiaW1wb3J0IHsgcmVnaXN0ZXJSdWxlIH0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpc2libGVCeVJ1bGUodmFsdWUsIGRpdmlzaWJsZUJ5KSB7XG4gIGxldCBtdWx0aXBsaWVyID0gTWF0aC5tYXgoKHZhbHVlIC0gTWF0aC5mbG9vcih2YWx1ZSkpLnRvU3RyaW5nKCkubGVuZ3RoIC0gMiwgKGRpdmlzaWJsZUJ5IC0gTWF0aC5mbG9vcihkaXZpc2libGVCeSkpLnRvU3RyaW5nKCkubGVuZ3RoIC0gMik7XG5cbiAgbXVsdGlwbGllciA9IG11bHRpcGxpZXIgPiAwID8gTWF0aC5wb3coMTAsIG11bHRpcGxpZXIpIDogMTtcblxuICByZXR1cm4gKHZhbHVlICogbXVsdGlwbGllcikgJSAoZGl2aXNpYmxlQnkgKiBtdWx0aXBsaWVyKSA9PT0gMDtcbn1cblxucmVnaXN0ZXJSdWxlKCdkaXZpc2libGVCeScsIGRpdmlzaWJsZUJ5UnVsZSwgJ211c3QgYmUgZGl2aXNpYmxlIGJ5ICV7ZXhwZWN0ZWR9Jyk7XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVudW1SdWxlKHZhbHVlLCBlKSB7XG4gIHJldHVybiBlICYmIGUuaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xufVxuXG5yZWdpc3RlclJ1bGUoJ2VudW0nLCBlbnVtUnVsZSwgJ211c3QgYmUgcHJlc2VudCBpbiBnaXZlbiBlbnVtZXJhdG9yJyk7XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1heFJ1bGUodmFsdWUsIG1heCkge1xuICByZXR1cm4gdmFsdWUgPD0gbWF4O1xufVxuXG5yZWdpc3RlclJ1bGUoJ21heCcsIG1heFJ1bGUsICdtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAle2V4cGVjdGVkfScpO1xuIiwiaW1wb3J0IHsgcmVnaXN0ZXJSdWxlIH0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXhJdGVtc1J1bGUodmFsdWUsIG1pbkl0ZW1zKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPD0gbWluSXRlbXM7XG59XG5cbnJlZ2lzdGVyUnVsZSgnbWF4SXRlbXMnLCBtYXhJdGVtc1J1bGUsICdtdXN0IGNvbnRhaW4gbGVzcyB0aGFuICV7ZXhwZWN0ZWR9IGl0ZW1zJyk7XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1heExlbmd0aFJ1bGUodmFsdWUsIG1heExlbmd0aCkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoIDw9IG1heExlbmd0aDtcbn1cblxucmVnaXN0ZXJSdWxlKCdtYXhMZW5ndGgnLCBtYXhMZW5ndGhSdWxlLCAnaXMgdG9vIGxvbmcgKG1heGltdW0gaXMgJXtleHBlY3RlZH0gY2hhcmFjdGVycyknKTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyUnVsZSB9IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhjbHVzaXZlTWF4UnVsZSh2YWx1ZSwgZXhjbHVzaXZlTWF4KSB7XG4gIHJldHVybiB2YWx1ZSA8IGV4Y2x1c2l2ZU1heDtcbn1cblxucmVnaXN0ZXJSdWxlKCdleGNsdXNpdmVNYXgnLCBleGNsdXNpdmVNYXhSdWxlLCAnbXVzdCBiZSBsZXNzIHRoYW4gJXtleHBlY3RlZH0nKTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyUnVsZSB9IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWluUnVsZSh2YWx1ZSwgbWluKSB7XG4gIHJldHVybiB2YWx1ZSA+PSBtaW47XG59XG5cbnJlZ2lzdGVyUnVsZSgnbWluJywgbWluUnVsZSwgJ211c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICV7ZXhwZWN0ZWR9Jyk7XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1pbkl0ZW1zUnVsZSh2YWx1ZSwgbWluSXRlbXMpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+PSBtaW5JdGVtcztcbn1cblxucmVnaXN0ZXJSdWxlKCdtaW5JdGVtcycsIG1pbkl0ZW1zUnVsZSwgJ211c3QgY29udGFpbiBtb3JlIHRoYW4gJXtleHBlY3RlZH0gaXRlbXMnKTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyUnVsZSB9IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWluTGVuZ3RoUnVsZSh2YWx1ZSwgbWluTGVuZ3RoKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPj0gbWluTGVuZ3RoO1xufVxuXG5yZWdpc3RlclJ1bGUoJ21pbkxlbmd0aCcsIG1pbkxlbmd0aFJ1bGUsICdpcyB0b28gc2hvcnQgKG1pbmltdW0gaXMgJXtleHBlY3RlZH0gY2hhcmFjdGVycyknKTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyUnVsZSB9IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhjbHVzaXZlTWluUnVsZSh2YWx1ZSwgZXhjbHVzaXZlTWluKSB7XG4gIHJldHVybiB2YWx1ZSA+IGV4Y2x1c2l2ZU1pbjtcbn1cblxucmVnaXN0ZXJSdWxlKCdleGNsdXNpdmVNaW4nLCBleGNsdXNpdmVNaW5SdWxlLCAnbXVzdCBiZSBncmVhdGVyIHRoYW4gJXtleHBlY3RlZH0nKTtcbiIsImltcG9ydCB7IHJlZ2lzdGVyUnVsZSwgaXNTdHJpbmcgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhdHRlcm5SdWxlKHZhbHVlLCBwYXR0ZXJuKSB7XG4gIHBhdHRlcm4gPSBpc1N0cmluZyh2YWx1ZSlcbiAgICA/IG5ldyBSZWdFeHAocGF0dGVybilcbiAgICA6IHBhdHRlcm47XG5cbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh2YWx1ZSk7XG59XG5cbnJlZ2lzdGVyUnVsZSgncGF0dGVybicsIHBhdHRlcm5SdWxlLCAnaW52YWxpZCBpbnB1dCcpO1xuIiwiaW1wb3J0IHsgcmVnaXN0ZXJSdWxlIH0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlZFJ1bGUodmFsdWUsIHJlcXVpcmVkKSB7XG4gIHJldHVybiAhIXZhbHVlIHx8ICFyZXF1aXJlZDtcbn1cblxucmVnaXN0ZXJSdWxlKCdyZXF1aXJlZCcsIHJlcXVpcmVkUnVsZSwgJ2lzIHJlcXVpcmVkJyk7XG4iLCJpbXBvcnQgeyByZWdpc3RlclJ1bGUsIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZywgaXNEYXRlLCBpc051bWJlciwgaXNCb29sZWFuIH0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlUnVsZSh2YWx1ZSwgdHlwZSkge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc051bWJlcih2YWx1ZSk7XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIGlzU3RyaW5nKHZhbHVlKTtcblxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIGlzRGF0ZSh2YWx1ZSk7XG5cbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKTtcblxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5yZWdpc3RlclJ1bGUoJ3R5cGUnLCB0eXBlUnVsZSwgJ211c3QgYmUgb2YgJXtleHBlY3RlZH0gdHlwZScpO1xuIiwidmFyIGNvcmUgID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpXG4gICwgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHtzdHJpbmdpZnk6IEpTT04uc3RyaW5naWZ5fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiaW1wb3J0IHsgcmVnaXN0ZXJSdWxlIH0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJdGVtc1J1bGUodmFsdWUsIHVuaXF1ZUl0ZW1zKSB7XG4gIGlmICghdW5pcXVlSXRlbXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBoYXNoID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIga2V5ID0gSlNPTi5zdHJpbmdpZnkodmFsdWVbaV0pO1xuICAgIGlmIChoYXNoW2tleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBoYXNoW2tleV0gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnJlZ2lzdGVyUnVsZSgndW5pcXVlSXRlbXMnLCB1bmlxdWVJdGVtc1J1bGUsICdtdXN0IGhvbGQgYSB1bmlxdWUgc2V0IG9mIHZhbHVlcycpO1xuIl0sIm5hbWVzIjpbImNvbW1vbmpzSGVscGVycy5jb21tb25qc0dsb2JhbCIsInRoaXMiLCJjb21tb25qc0hlbHBlcnMuaW50ZXJvcERlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxDQUFBOzs7Ozs7Ozs7O0FBVUEsQ0FBQSxDQUFDLENBQUMsU0FBUyxNQUFNLEVBQUU7R0FDakIsWUFBWSxDQUFDOztHQUViLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0dBQzdDLElBQUksU0FBUyxDQUFDO0dBQ2QsSUFBSSxPQUFPLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7R0FDekQsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7R0FDdEQsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLGVBQWUsQ0FBQzs7R0FFL0QsSUFBSSxRQUFRLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0dBQzFDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztHQUN4QyxJQUFJLE9BQU8sRUFBRTtLQUNYLElBQUksUUFBUSxFQUFFOzs7T0FHWixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztNQUMxQjs7O0tBR0QsT0FBTztJQUNSOzs7O0dBSUQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0dBRXJFLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7S0FFakQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sSUFBSSxTQUFT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
