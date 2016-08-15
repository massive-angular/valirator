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

	function isDefined(obj) {
	  return !(obj === undefined || obj === null);
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
	    var _schema$rules, schemaRules, _schema$messages, schemaMessages, schemaProperties;

	    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _schema$rules = schema.rules;
	            schemaRules = _schema$rules === undefined ? {} : _schema$rules;
	            _schema$messages = schema.messages;
	            schemaMessages = _schema$messages === undefined ? {} : _schema$messages;
	            schemaProperties = schema.properties;
	            _context4.next = 7;
	            return validateSchema(obj, schemaProperties || schema, schemaRules, schemaMessages, {});

	          case 7:
	            return _context4.abrupt('return', _context4.sent);

	          case 8:
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

function divisibleByRule(value, divisibleBy) {	  if (!isDefined(value)) {
	    return true;
	  }

	  var multiplier = Math.max((value - Math.floor(value)).toString().length - 2, (divisibleBy - Math.floor(divisibleBy)).toString().length - 2);

	  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

	  return value * multiplier % (divisibleBy * multiplier) === 0;
	}

	registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');

function enumRule(value, e) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return isArray(e) && e.indexOf(value) !== -1;
	}

	registerRule('enum', enumRule, 'must be present in given enumerator');

var FORMATS = {
	  'email': /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
	  'ip-address': /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
	  'ipv6': /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
	  'time': /^\d{2}:\d{2}:\d{2}$/,
	  'date': /^\d{4}-\d{2}-\d{2}$/,
	  'date-time': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
	  'color': /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
	  'host-name': /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
	  'url': /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
	  'regex': {
	    test: function test(value) {
	      try {
	        new RegExp(value);
	      } catch (e) {
	        return false;
	      }

	      return true;
	    }
	  }
	};

	function formatRule(value, format) {	  if (!isDefined(value)) {
	    return true;
	  }

	  if (!FORMATS[format]) {
	    throw new Error('Unknown format "' + format + '"');
	  }

	  return FORMATS[format].test(value);
	}

	registerRule('format', formatRule, 'is not a valid %{expected}');

function maxRule(value, max) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value <= max;
	}

	registerRule('max', maxRule, 'must be less than or equal to %{expected}');

function maxItemsRule(value, minItems) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return isArray(value) && value.length <= minItems;
	}

	registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');

function maxLengthRule(value, maxLength) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value.length <= maxLength;
	}

	registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');

function exclusiveMaxRule(value, exclusiveMax) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value < exclusiveMax;
	}

	registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');

function minRule(value, min) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value >= min;
	}

	registerRule('min', minRule, 'must be greater than or equal to %{expected}');

function minItemsRule(value, minItems) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return isArray(value) && value.length >= minItems;
	}

	registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');

function minLengthRule(value, minLength) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value.length >= minLength;
	}

	registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');

function exclusiveMinRule(value, exclusiveMin) {	  if (!isDefined(value)) {
	    return true;
	  }

	  return value > exclusiveMin;
	}

	registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');

function patternRule(value, pattern) {	  if (!isDefined(value)) {
	    return true;
	  }

	  pattern = isString(pattern) ? new RegExp(pattern) : pattern;

	  return pattern.test(value);
	}

	registerRule('pattern', patternRule, 'invalid input');

function requiredRule(value, required) {	  if (value) {
	    return true;
	  }

	  if (isBoolean(required)) {
	    return !required;
	  }

	  if (isObject(required)) {
	    var allowEmpty = required.allowEmpty;
	    var allowZero = required.allowZero;


	    if (isBoolean(allowEmpty)) {
	      return allowEmpty && value === '';
	    }

	    if (isBoolean(allowZero)) {
	      return allowZero && value === 0;
	    }
	  }

	  return isDefined(value);
	}

	registerRule('required', requiredRule, 'is required');

function checkValueType(value, type) {
	  switch (type) {
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

	function typeRule(value, type) {	  if (!isDefined(value)) {
	    return true;
	  }

	  var types = type;

	  if (!Array.isArray(type)) {
	    types = [type];
	  }

	  return types.some(function (type) {
	    return checkValueType(value, type);
	  });
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

function uniqueItemsRule(value, uniqueItems) {	  if (!isDefined(value)) {
	    return true;
	  }

	  if (!uniqueItems) {
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

export { isType, isObject, isArray, isFunction, isString, isDate, isNumber, isBoolean, isDefined, noop, getObjectOverride, formatMessage, registerRule, hasRule, getRule, validate, divisibleByRule, enumRule, formatRule, maxRule, maxItemsRule, maxLengthRule, exclusiveMaxRule, minRule, minItemsRule, minLengthRule, exclusiveMinRule, patternRule, requiredRule, typeRule, uniqueItemsRule };
//# sourceMappingURL=valirator.es6.map
