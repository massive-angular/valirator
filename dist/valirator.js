(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.valirator = global.valirator || {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var _global$1 = interopDefault(_global);


	var require$$3 = Object.freeze({
	  default: _global$1
	});

	var _has = createCommonjsModule(function (module) {
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};
	});

	var _has$1 = interopDefault(_has);


	var require$$4 = Object.freeze({
	  default: _has$1
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


	var require$$1$1 = Object.freeze({
	  default: _fails$1
	});

	var _descriptors = createCommonjsModule(function (module) {
	// Thank's IE8 for his funny defineProperty
	module.exports = !interopDefault(require$$1$1)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _descriptors$1 = interopDefault(_descriptors);


	var require$$1 = Object.freeze({
	  default: _descriptors$1
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

	var _core$1 = interopDefault(_core);
	var version = _core.version;

var require$$0 = Object.freeze({
		default: _core$1,
		version: version
	});

	var _isObject = createCommonjsModule(function (module) {
	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	});

	var _isObject$1 = interopDefault(_isObject);


	var require$$0$1 = Object.freeze({
	  default: _isObject$1
	});

	var _anObject = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$0$1);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	});

	var _anObject$1 = interopDefault(_anObject);


	var require$$5 = Object.freeze({
	  default: _anObject$1
	});

	var _domCreate = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$0$1)
	  , document = interopDefault(require$$3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};
	});

	var _domCreate$1 = interopDefault(_domCreate);


	var require$$2$2 = Object.freeze({
	  default: _domCreate$1
	});

	var _ie8DomDefine = createCommonjsModule(function (module) {
	module.exports = !interopDefault(require$$1) && !interopDefault(require$$1$1)(function(){
	  return Object.defineProperty(interopDefault(require$$2$2)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);


	var require$$1$3 = Object.freeze({
	  default: _ie8DomDefine$1
	});

	var _toPrimitive = createCommonjsModule(function (module) {
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = interopDefault(require$$0$1);
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


	var require$$4$1 = Object.freeze({
	  default: _toPrimitive$1
	});

	var _objectDp = createCommonjsModule(function (module, exports) {
	var anObject       = interopDefault(require$$5)
	  , IE8_DOM_DEFINE = interopDefault(require$$1$3)
	  , toPrimitive    = interopDefault(require$$4$1)
	  , dP             = Object.defineProperty;

	exports.f = interopDefault(require$$1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

var require$$2$1 = Object.freeze({
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


	var require$$2$3 = Object.freeze({
	  default: _propertyDesc$1
	});

	var _hide = createCommonjsModule(function (module) {
	var dP         = interopDefault(require$$2$1)
	  , createDesc = interopDefault(require$$2$3);
	module.exports = interopDefault(require$$1) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};
	});

	var _hide$1 = interopDefault(_hide);


	var require$$2 = Object.freeze({
	  default: _hide$1
	});

	var _uid = createCommonjsModule(function (module) {
	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};
	});

	var _uid$1 = interopDefault(_uid);


	var require$$12 = Object.freeze({
	  default: _uid$1
	});

	var _redefine = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$3)
	  , hide      = interopDefault(require$$2)
	  , has       = interopDefault(require$$4)
	  , SRC       = interopDefault(require$$12)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	interopDefault(require$$0).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _redefine$1 = interopDefault(_redefine);


	var require$$4$2 = Object.freeze({
	  default: _redefine$1
	});

	var _aFunction = createCommonjsModule(function (module) {
	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};
	});

	var _aFunction$1 = interopDefault(_aFunction);


	var require$$0$2 = Object.freeze({
	  default: _aFunction$1
	});

	var _ctx = createCommonjsModule(function (module) {
	// optional / simple context binding
	var aFunction = interopDefault(require$$0$2);
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


	var require$$31 = Object.freeze({
	  default: _ctx$1
	});

	var _export = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$3)
	  , core      = interopDefault(require$$0)
	  , hide      = interopDefault(require$$2)
	  , redefine  = interopDefault(require$$4$2)
	  , ctx       = interopDefault(require$$31)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
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


	var require$$1$2 = Object.freeze({
	  default: _export$1
	});

	var _meta = createCommonjsModule(function (module) {
	var META     = interopDefault(require$$12)('meta')
	  , isObject = interopDefault(require$$0$1)
	  , has      = interopDefault(require$$4)
	  , setDesc  = interopDefault(require$$2$1).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !interopDefault(require$$1$1)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};
	});

	var _meta$1 = interopDefault(_meta);
	var KEY = _meta.KEY;
	var NEED = _meta.NEED;
	var fastKey = _meta.fastKey;
	var getWeak = _meta.getWeak;
	var onFreeze = _meta.onFreeze;

var require$$6 = Object.freeze({
	  default: _meta$1,
	  KEY: KEY,
	  NEED: NEED,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	});

	var _shared = createCommonjsModule(function (module) {
	var global = interopDefault(require$$3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};
	});

	var _shared$1 = interopDefault(_shared);


	var require$$1$4 = Object.freeze({
	  default: _shared$1
	});

	var _wks = createCommonjsModule(function (module) {
	var store      = interopDefault(require$$1$4)('wks')
	  , uid        = interopDefault(require$$12)
	  , Symbol     = interopDefault(require$$3).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = interopDefault(_wks);


	var require$$0$4 = Object.freeze({
	  default: _wks$1
	});

	var _setToStringTag = createCommonjsModule(function (module) {
	var def = interopDefault(require$$2$1).f
	  , has = interopDefault(require$$4)
	  , TAG = interopDefault(require$$0$4)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};
	});

	var _setToStringTag$1 = interopDefault(_setToStringTag);


	var require$$0$3 = Object.freeze({
	  default: _setToStringTag$1
	});

	var _wksExt = createCommonjsModule(function (module, exports) {
	exports.f = interopDefault(require$$0$4);
	});

	var _wksExt$1 = interopDefault(_wksExt);
	var f$1 = _wksExt.f;

var require$$1$5 = Object.freeze({
		default: _wksExt$1,
		f: f$1
	});

	var _library = createCommonjsModule(function (module) {
	module.exports = false;
	});

	var _library$1 = interopDefault(_library);


	var require$$2$4 = Object.freeze({
		default: _library$1
	});

	var _wksDefine = createCommonjsModule(function (module) {
	var global         = interopDefault(require$$3)
	  , core           = interopDefault(require$$0)
	  , LIBRARY        = interopDefault(require$$2$4)
	  , wksExt         = interopDefault(require$$1$5)
	  , defineProperty = interopDefault(require$$2$1).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};
	});

	var _wksDefine$1 = interopDefault(_wksDefine);


	var require$$0$5 = Object.freeze({
	  default: _wksDefine$1
	});

	var _cof = createCommonjsModule(function (module) {
	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};
	});

	var _cof$1 = interopDefault(_cof);


	var require$$0$6 = Object.freeze({
	  default: _cof$1
	});

	var _iobject = createCommonjsModule(function (module) {
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = interopDefault(require$$0$6);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};
	});

	var _iobject$1 = interopDefault(_iobject);


	var require$$1$8 = Object.freeze({
	  default: _iobject$1
	});

	var _defined = createCommonjsModule(function (module) {
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};
	});

	var _defined$1 = interopDefault(_defined);


	var require$$4$3 = Object.freeze({
	  default: _defined$1
	});

	var _toIobject = createCommonjsModule(function (module) {
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = interopDefault(require$$1$8)
	  , defined = interopDefault(require$$4$3);
	module.exports = function(it){
	  return IObject(defined(it));
	};
	});

	var _toIobject$1 = interopDefault(_toIobject);


	var require$$1$7 = Object.freeze({
	  default: _toIobject$1
	});

	var _toInteger = createCommonjsModule(function (module) {
	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
	});

	var _toInteger$1 = interopDefault(_toInteger);


	var require$$26 = Object.freeze({
	  default: _toInteger$1
	});

	var _toLength = createCommonjsModule(function (module) {
	// 7.1.15 ToLength
	var toInteger = interopDefault(require$$26)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};
	});

	var _toLength$1 = interopDefault(_toLength);


	var require$$3$1 = Object.freeze({
	  default: _toLength$1
	});

	var _toIndex = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$26)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};
	});

	var _toIndex$1 = interopDefault(_toIndex);


	var require$$24 = Object.freeze({
	  default: _toIndex$1
	});

	var _arrayIncludes = createCommonjsModule(function (module) {
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = interopDefault(require$$1$7)
	  , toLength  = interopDefault(require$$3$1)
	  , toIndex   = interopDefault(require$$24);
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

	var _sharedKey = createCommonjsModule(function (module) {
	var shared = interopDefault(require$$1$4)('keys')
	  , uid    = interopDefault(require$$12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};
	});

	var _sharedKey$1 = interopDefault(_sharedKey);


	var require$$0$7 = Object.freeze({
	  default: _sharedKey$1
	});

	var _objectKeysInternal = createCommonjsModule(function (module) {
	var has          = interopDefault(require$$4)
	  , toIObject    = interopDefault(require$$1$7)
	  , arrayIndexOf = interopDefault(require$$1$9)(false)
	  , IE_PROTO     = interopDefault(require$$0$7)('IE_PROTO');

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

	var _enumBugKeys = createCommonjsModule(function (module) {
	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');
	});

	var _enumBugKeys$1 = interopDefault(_enumBugKeys);


	var require$$0$8 = Object.freeze({
	  default: _enumBugKeys$1
	});

	var _objectKeys = createCommonjsModule(function (module) {
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = interopDefault(require$$1$6)
	  , enumBugKeys = interopDefault(require$$0$8);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};
	});

	var _objectKeys$1 = interopDefault(_objectKeys);


	var require$$2$5 = Object.freeze({
	  default: _objectKeys$1
	});

	var _keyof = createCommonjsModule(function (module) {
	var getKeys   = interopDefault(require$$2$5)
	  , toIObject = interopDefault(require$$1$7);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};
	});

	var _keyof$1 = interopDefault(_keyof);


	var require$$16 = Object.freeze({
	  default: _keyof$1
	});

	var _objectGops = createCommonjsModule(function (module, exports) {
	exports.f = Object.getOwnPropertySymbols;
	});

	var _objectGops$1 = interopDefault(_objectGops);
	var f$2 = _objectGops.f;

var require$$2$6 = Object.freeze({
		default: _objectGops$1,
		f: f$2
	});

	var _objectPie = createCommonjsModule(function (module, exports) {
	exports.f = {}.propertyIsEnumerable;
	});

	var _objectPie$1 = interopDefault(_objectPie);
	var f$3 = _objectPie.f;

var require$$0$9 = Object.freeze({
		default: _objectPie$1,
		f: f$3
	});

	var _enumKeys = createCommonjsModule(function (module) {
	// all enumerable object keys, includes symbols
	var getKeys = interopDefault(require$$2$5)
	  , gOPS    = interopDefault(require$$2$6)
	  , pIE     = interopDefault(require$$0$9);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};
	});

	var _enumKeys$1 = interopDefault(_enumKeys);


	var require$$15 = Object.freeze({
	  default: _enumKeys$1
	});

	var _isArray = createCommonjsModule(function (module) {
	// 7.2.2 IsArray(argument)
	var cof = interopDefault(require$$0$6);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};
	});

	var _isArray$1 = interopDefault(_isArray);


	var require$$1$10 = Object.freeze({
	  default: _isArray$1
	});

	var _objectDps = createCommonjsModule(function (module) {
	var dP       = interopDefault(require$$2$1)
	  , anObject = interopDefault(require$$5)
	  , getKeys  = interopDefault(require$$2$5);

	module.exports = interopDefault(require$$1) ? Object.defineProperties : function defineProperties(O, Properties){
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


	var require$$0$10 = Object.freeze({
	  default: _objectDps$1
	});

	var _html = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$3).document && document.documentElement;
	});

	var _html$1 = interopDefault(_html);


	var require$$3$2 = Object.freeze({
		default: _html$1
	});

	var _objectCreate = createCommonjsModule(function (module) {
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = interopDefault(require$$5)
	  , dPs         = interopDefault(require$$0$10)
	  , enumBugKeys = interopDefault(require$$0$8)
	  , IE_PROTO    = interopDefault(require$$0$7)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = interopDefault(require$$2$2)('iframe')
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


	var require$$6$1 = Object.freeze({
	  default: _objectCreate$1
	});

	var _objectGopn = createCommonjsModule(function (module, exports) {
	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = interopDefault(require$$1$6)
	  , hiddenKeys = interopDefault(require$$0$8).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};
	});

	var _objectGopn$1 = interopDefault(_objectGopn);
	var f$5 = _objectGopn.f;

var require$$3$3 = Object.freeze({
	  default: _objectGopn$1,
	  f: f$5
	});

	var _objectGopnExt = createCommonjsModule(function (module) {
	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = interopDefault(require$$1$7)
	  , gOPN      = interopDefault(require$$3$3).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};
	});

	var _objectGopnExt$1 = interopDefault(_objectGopnExt);
	var f$4 = _objectGopnExt.f;

var require$$0$11 = Object.freeze({
	  default: _objectGopnExt$1,
	  f: f$4
	});

	var _objectGopd = createCommonjsModule(function (module, exports) {
	var pIE            = interopDefault(require$$0$9)
	  , createDesc     = interopDefault(require$$2$3)
	  , toIObject      = interopDefault(require$$1$7)
	  , toPrimitive    = interopDefault(require$$4$1)
	  , has            = interopDefault(require$$4)
	  , IE8_DOM_DEFINE = interopDefault(require$$1$3)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = interopDefault(require$$1) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};
	});

	var _objectGopd$1 = interopDefault(_objectGopd);
	var f$6 = _objectGopd.f;

var require$$2$7 = Object.freeze({
	  default: _objectGopd$1,
	  f: f$6
	});

	var es6_symbol = createCommonjsModule(function (module) {
	'use strict';
	// ECMAScript 6 symbols shim
	var global         = interopDefault(require$$3)
	  , has            = interopDefault(require$$4)
	  , DESCRIPTORS    = interopDefault(require$$1)
	  , $export        = interopDefault(require$$1$2)
	  , redefine       = interopDefault(require$$4$2)
	  , META           = interopDefault(require$$6).KEY
	  , $fails         = interopDefault(require$$1$1)
	  , shared         = interopDefault(require$$1$4)
	  , setToStringTag = interopDefault(require$$0$3)
	  , uid            = interopDefault(require$$12)
	  , wks            = interopDefault(require$$0$4)
	  , wksExt         = interopDefault(require$$1$5)
	  , wksDefine      = interopDefault(require$$0$5)
	  , keyOf          = interopDefault(require$$16)
	  , enumKeys       = interopDefault(require$$15)
	  , isArray        = interopDefault(require$$1$10)
	  , anObject       = interopDefault(require$$5)
	  , toIObject      = interopDefault(require$$1$7)
	  , toPrimitive    = interopDefault(require$$4$1)
	  , createDesc     = interopDefault(require$$2$3)
	  , _create        = interopDefault(require$$6$1)
	  , gOPNExt        = interopDefault(require$$0$11)
	  , $GOPD          = interopDefault(require$$2$7)
	  , $DP            = interopDefault(require$$2$1)
	  , $keys          = interopDefault(require$$2$5)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  interopDefault(require$$3$3).f = gOPNExt.f = $getOwnPropertyNames;
	  interopDefault(require$$0$9).f  = $propertyIsEnumerable;
	  interopDefault(require$$2$6).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !interopDefault(require$$2$4)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || interopDefault(require$$2)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);
	});

	interopDefault(es6_symbol);

	var es6_object_create = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: interopDefault(require$$6$1)});
	});

	interopDefault(es6_object_create);

	var es6_object_defineProperty = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !interopDefault(require$$1), 'Object', {defineProperty: interopDefault(require$$2$1).f});
	});

	interopDefault(es6_object_defineProperty);

	var es6_object_defineProperties = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !interopDefault(require$$1), 'Object', {defineProperties: interopDefault(require$$0$10)});
	});

	interopDefault(es6_object_defineProperties);

	var _objectSap = createCommonjsModule(function (module) {
	// most Object methods by ES6 should accept primitives
	var $export = interopDefault(require$$1$2)
	  , core    = interopDefault(require$$0)
	  , fails   = interopDefault(require$$1$1);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};
	});

	var _objectSap$1 = interopDefault(_objectSap);


	var require$$0$12 = Object.freeze({
	  default: _objectSap$1
	});

	var es6_object_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = interopDefault(require$$1$7)
	  , $getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	interopDefault(require$$0$12)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});
	});

	interopDefault(es6_object_getOwnPropertyDescriptor);

	var _toObject = createCommonjsModule(function (module) {
	// 7.1.13 ToObject(argument)
	var defined = interopDefault(require$$4$3);
	module.exports = function(it){
	  return Object(defined(it));
	};
	});

	var _toObject$1 = interopDefault(_toObject);


	var require$$5$1 = Object.freeze({
	  default: _toObject$1
	});

	var _objectGpo = createCommonjsModule(function (module) {
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = interopDefault(require$$4)
	  , toObject    = interopDefault(require$$5$1)
	  , IE_PROTO    = interopDefault(require$$0$7)('IE_PROTO')
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


	var require$$0$13 = Object.freeze({
	  default: _objectGpo$1
	});

	var es6_object_getPrototypeOf = createCommonjsModule(function (module) {
	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = interopDefault(require$$5$1)
	  , $getPrototypeOf = interopDefault(require$$0$13);

	interopDefault(require$$0$12)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});
	});

	interopDefault(es6_object_getPrototypeOf);

	var es6_object_keys = createCommonjsModule(function (module) {
	// 19.1.2.14 Object.keys(O)
	var toObject = interopDefault(require$$5$1)
	  , $keys    = interopDefault(require$$2$5);

	interopDefault(require$$0$12)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});
	});

	interopDefault(es6_object_keys);

	var es6_object_getOwnPropertyNames = createCommonjsModule(function (module) {
	// 19.1.2.7 Object.getOwnPropertyNames(O)
	interopDefault(require$$0$12)('getOwnPropertyNames', function(){
	  return interopDefault(require$$0$11).f;
	});
	});

	interopDefault(es6_object_getOwnPropertyNames);

	var es6_object_freeze = createCommonjsModule(function (module) {
	// 19.1.2.5 Object.freeze(O)
	var isObject = interopDefault(require$$0$1)
	  , meta     = interopDefault(require$$6).onFreeze;

	interopDefault(require$$0$12)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});
	});

	interopDefault(es6_object_freeze);

	var es6_object_seal = createCommonjsModule(function (module) {
	// 19.1.2.17 Object.seal(O)
	var isObject = interopDefault(require$$0$1)
	  , meta     = interopDefault(require$$6).onFreeze;

	interopDefault(require$$0$12)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});
	});

	interopDefault(es6_object_seal);

	var es6_object_preventExtensions = createCommonjsModule(function (module) {
	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = interopDefault(require$$0$1)
	  , meta     = interopDefault(require$$6).onFreeze;

	interopDefault(require$$0$12)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});
	});

	interopDefault(es6_object_preventExtensions);

	var es6_object_isFrozen = createCommonjsModule(function (module) {
	// 19.1.2.12 Object.isFrozen(O)
	var isObject = interopDefault(require$$0$1);

	interopDefault(require$$0$12)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});
	});

	interopDefault(es6_object_isFrozen);

	var es6_object_isSealed = createCommonjsModule(function (module) {
	// 19.1.2.13 Object.isSealed(O)
	var isObject = interopDefault(require$$0$1);

	interopDefault(require$$0$12)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});
	});

	interopDefault(es6_object_isSealed);

	var es6_object_isExtensible = createCommonjsModule(function (module) {
	// 19.1.2.11 Object.isExtensible(O)
	var isObject = interopDefault(require$$0$1);

	interopDefault(require$$0$12)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});
	});

	interopDefault(es6_object_isExtensible);

	var _objectAssign = createCommonjsModule(function (module) {
	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = interopDefault(require$$2$5)
	  , gOPS     = interopDefault(require$$2$6)
	  , pIE      = interopDefault(require$$0$9)
	  , toObject = interopDefault(require$$5$1)
	  , IObject  = interopDefault(require$$1$8)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || interopDefault(require$$1$1)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;
	});

	var _objectAssign$1 = interopDefault(_objectAssign);


	var require$$3$4 = Object.freeze({
	  default: _objectAssign$1
	});

	var es6_object_assign = createCommonjsModule(function (module) {
	// 19.1.3.1 Object.assign(target, source)
	var $export = interopDefault(require$$1$2);

	$export($export.S + $export.F, 'Object', {assign: interopDefault(require$$3$4)});
	});

	interopDefault(es6_object_assign);

	var _sameValue = createCommonjsModule(function (module) {
	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};
	});

	var _sameValue$1 = interopDefault(_sameValue);


	var require$$21 = Object.freeze({
	  default: _sameValue$1
	});

	var es6_object_is = createCommonjsModule(function (module) {
	// 19.1.3.10 Object.is(value1, value2)
	var $export = interopDefault(require$$1$2);
	$export($export.S, 'Object', {is: interopDefault(require$$21)});
	});

	interopDefault(es6_object_is);

	var _setProto = createCommonjsModule(function (module) {
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = interopDefault(require$$0$1)
	  , anObject = interopDefault(require$$5);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = interopDefault(require$$31)(Function.call, interopDefault(require$$2$7).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	});

	var _setProto$1 = interopDefault(_setProto);
	var set = _setProto.set;
	var check = _setProto.check;

var require$$0$14 = Object.freeze({
	  default: _setProto$1,
	  set: set,
	  check: check
	});

	var es6_object_setPrototypeOf = createCommonjsModule(function (module) {
	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = interopDefault(require$$1$2);
	$export($export.S, 'Object', {setPrototypeOf: interopDefault(require$$0$14).set});
	});

	interopDefault(es6_object_setPrototypeOf);

	var _classof = createCommonjsModule(function (module) {
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = interopDefault(require$$0$6)
	  , TAG = interopDefault(require$$0$4)('toStringTag')
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


	var require$$1$11 = Object.freeze({
	  default: _classof$1
	});

	var es6_object_toString = createCommonjsModule(function (module) {
	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = interopDefault(require$$1$11)
	  , test    = {};
	test[interopDefault(require$$0$4)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  interopDefault(require$$4$2)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}
	});

	interopDefault(es6_object_toString);

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


	var require$$1$13 = Object.freeze({
	  default: _invoke$1
	});

	var _bind = createCommonjsModule(function (module) {
	'use strict';
	var aFunction  = interopDefault(require$$0$2)
	  , isObject   = interopDefault(require$$0$1)
	  , invoke     = interopDefault(require$$1$13)
	  , arraySlice = [].slice
	  , factories  = {};

	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};
	});

	var _bind$1 = interopDefault(_bind);


	var require$$1$12 = Object.freeze({
	  default: _bind$1
	});

	var es6_function_bind = createCommonjsModule(function (module) {
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = interopDefault(require$$1$2);

	$export($export.P, 'Function', {bind: interopDefault(require$$1$12)});
	});

	interopDefault(es6_function_bind);

	var es6_function_name = createCommonjsModule(function (module) {
	var dP         = interopDefault(require$$2$1).f
	  , createDesc = interopDefault(require$$2$3)
	  , has        = interopDefault(require$$4)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';

	var isExtensible = Object.isExtensible || function(){
	  return true;
	};

	// 19.2.4.2 name
	NAME in FProto || interopDefault(require$$1) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});
	});

	interopDefault(es6_function_name);

	var es6_function_hasInstance = createCommonjsModule(function (module) {
	'use strict';
	var isObject       = interopDefault(require$$0$1)
	  , getPrototypeOf = interopDefault(require$$0$13)
	  , HAS_INSTANCE   = interopDefault(require$$0$4)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))interopDefault(require$$2$1).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});
	});

	interopDefault(es6_function_hasInstance);

	var _stringWs = createCommonjsModule(function (module) {
	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	});

	var _stringWs$1 = interopDefault(_stringWs);


	var require$$0$17 = Object.freeze({
	  default: _stringWs$1
	});

	var _stringTrim = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2)
	  , defined = interopDefault(require$$4$3)
	  , fails   = interopDefault(require$$1$1)
	  , spaces  = interopDefault(require$$0$17)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;
	});

	var _stringTrim$1 = interopDefault(_stringTrim);


	var require$$0$16 = Object.freeze({
	  default: _stringTrim$1
	});

	var _parseInt = createCommonjsModule(function (module) {
	var $parseInt = interopDefault(require$$3).parseInt
	  , $trim     = interopDefault(require$$0$16).trim
	  , ws        = interopDefault(require$$0$17)
	  , hex       = /^[\-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;
	});

	var _parseInt$1 = interopDefault(_parseInt);


	var require$$0$15 = Object.freeze({
	  default: _parseInt$1
	});

	var es6_parseInt = createCommonjsModule(function (module) {
	var $export   = interopDefault(require$$1$2)
	  , $parseInt = interopDefault(require$$0$15);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
	});

	interopDefault(es6_parseInt);

	var _parseFloat = createCommonjsModule(function (module) {
	var $parseFloat = interopDefault(require$$3).parseFloat
	  , $trim       = interopDefault(require$$0$16).trim;

	module.exports = 1 / $parseFloat(interopDefault(require$$0$17) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;
	});

	var _parseFloat$1 = interopDefault(_parseFloat);


	var require$$0$18 = Object.freeze({
	  default: _parseFloat$1
	});

	var es6_parseFloat = createCommonjsModule(function (module) {
	var $export     = interopDefault(require$$1$2)
	  , $parseFloat = interopDefault(require$$0$18);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
	});

	interopDefault(es6_parseFloat);

	var _inheritIfRequired = createCommonjsModule(function (module) {
	var isObject       = interopDefault(require$$0$1)
	  , setPrototypeOf = interopDefault(require$$0$14).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};
	});

	var _inheritIfRequired$1 = interopDefault(_inheritIfRequired);


	var require$$0$19 = Object.freeze({
	  default: _inheritIfRequired$1
	});

	var es6_number_constructor = createCommonjsModule(function (module) {
	'use strict';
	var global            = interopDefault(require$$3)
	  , has               = interopDefault(require$$4)
	  , cof               = interopDefault(require$$0$6)
	  , inheritIfRequired = interopDefault(require$$0$19)
	  , toPrimitive       = interopDefault(require$$4$1)
	  , fails             = interopDefault(require$$1$1)
	  , gOPN              = interopDefault(require$$3$3).f
	  , gOPD              = interopDefault(require$$2$7).f
	  , dP                = interopDefault(require$$2$1).f
	  , $trim             = interopDefault(require$$0$16).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(interopDefault(require$$6$1)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = interopDefault(require$$1) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  interopDefault(require$$4$2)(global, NUMBER, $Number);
	}
	});

	interopDefault(es6_number_constructor);

	var _aNumberValue = createCommonjsModule(function (module) {
	var cof = interopDefault(require$$0$6);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};
	});

	var _aNumberValue$1 = interopDefault(_aNumberValue);


	var require$$0$20 = Object.freeze({
	  default: _aNumberValue$1
	});

	var _stringRepeat = createCommonjsModule(function (module) {
	'use strict';
	var toInteger = interopDefault(require$$26)
	  , defined   = interopDefault(require$$4$3);

	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};
	});

	var _stringRepeat$1 = interopDefault(_stringRepeat);


	var require$$1$14 = Object.freeze({
	  default: _stringRepeat$1
	});

	var es6_number_toFixed = createCommonjsModule(function (module) {
	'use strict';
	var $export      = interopDefault(require$$1$2)
	  , toInteger    = interopDefault(require$$26)
	  , aNumberValue = interopDefault(require$$0$20)
	  , repeat       = interopDefault(require$$1$14)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';

	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};

	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !interopDefault(require$$1$1)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});
	});

	interopDefault(es6_number_toFixed);

	var es6_number_toPrecision = createCommonjsModule(function (module) {
	'use strict';
	var $export      = interopDefault(require$$1$2)
	  , $fails       = interopDefault(require$$1$1)
	  , aNumberValue = interopDefault(require$$0$20)
	  , $toPrecision = 1..toPrecision;

	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});
	});

	interopDefault(es6_number_toPrecision);

	var es6_number_epsilon = createCommonjsModule(function (module) {
	// 20.1.2.1 Number.EPSILON
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
	});

	interopDefault(es6_number_epsilon);

	var es6_number_isFinite = createCommonjsModule(function (module) {
	// 20.1.2.2 Number.isFinite(number)
	var $export   = interopDefault(require$$1$2)
	  , _isFinite = interopDefault(require$$3).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});
	});

	interopDefault(es6_number_isFinite);

	var _isInteger = createCommonjsModule(function (module) {
	// 20.1.2.3 Number.isInteger(number)
	var isObject = interopDefault(require$$0$1)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};
	});

	var _isInteger$1 = interopDefault(_isInteger);


	var require$$0$21 = Object.freeze({
	  default: _isInteger$1
	});

	var es6_number_isInteger = createCommonjsModule(function (module) {
	// 20.1.2.3 Number.isInteger(number)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Number', {isInteger: interopDefault(require$$0$21)});
	});

	interopDefault(es6_number_isInteger);

	var es6_number_isNan = createCommonjsModule(function (module) {
	// 20.1.2.4 Number.isNaN(number)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});
	});

	interopDefault(es6_number_isNan);

	var es6_number_isSafeInteger = createCommonjsModule(function (module) {
	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = interopDefault(require$$1$2)
	  , isInteger = interopDefault(require$$0$21)
	  , abs       = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});
	});

	interopDefault(es6_number_isSafeInteger);

	var es6_number_maxSafeInteger = createCommonjsModule(function (module) {
	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
	});

	interopDefault(es6_number_maxSafeInteger);

	var es6_number_minSafeInteger = createCommonjsModule(function (module) {
	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
	});

	interopDefault(es6_number_minSafeInteger);

	var es6_number_parseFloat = createCommonjsModule(function (module) {
	var $export     = interopDefault(require$$1$2)
	  , $parseFloat = interopDefault(require$$0$18);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
	});

	interopDefault(es6_number_parseFloat);

	var es6_number_parseInt = createCommonjsModule(function (module) {
	var $export   = interopDefault(require$$1$2)
	  , $parseInt = interopDefault(require$$0$15);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
	});

	interopDefault(es6_number_parseInt);

	var _mathLog1p = createCommonjsModule(function (module) {
	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};
	});

	var _mathLog1p$1 = interopDefault(_mathLog1p);


	var require$$0$22 = Object.freeze({
	  default: _mathLog1p$1
	});

	var es6_math_acosh = createCommonjsModule(function (module) {
	// 20.2.2.3 Math.acosh(x)
	var $export = interopDefault(require$$1$2)
	  , log1p   = interopDefault(require$$0$22)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;

	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});
	});

	interopDefault(es6_math_acosh);

	var es6_math_asinh = createCommonjsModule(function (module) {
	// 20.2.2.5 Math.asinh(x)
	var $export = interopDefault(require$$1$2)
	  , $asinh  = Math.asinh;

	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
	});

	interopDefault(es6_math_asinh);

	var es6_math_atanh = createCommonjsModule(function (module) {
	// 20.2.2.7 Math.atanh(x)
	var $export = interopDefault(require$$1$2)
	  , $atanh  = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});
	});

	interopDefault(es6_math_atanh);

	var _mathSign = createCommonjsModule(function (module) {
	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};
	});

	var _mathSign$1 = interopDefault(_mathSign);


	var require$$0$23 = Object.freeze({
	  default: _mathSign$1
	});

	var es6_math_cbrt = createCommonjsModule(function (module) {
	// 20.2.2.9 Math.cbrt(x)
	var $export = interopDefault(require$$1$2)
	  , sign    = interopDefault(require$$0$23);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});
	});

	interopDefault(es6_math_cbrt);

	var es6_math_clz32 = createCommonjsModule(function (module) {
	// 20.2.2.11 Math.clz32(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});
	});

	interopDefault(es6_math_clz32);

	var es6_math_cosh = createCommonjsModule(function (module) {
	// 20.2.2.12 Math.cosh(x)
	var $export = interopDefault(require$$1$2)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});
	});

	interopDefault(es6_math_cosh);

	var _mathExpm1 = createCommonjsModule(function (module) {
	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;
	});

	var _mathExpm1$1 = interopDefault(_mathExpm1);


	var require$$0$24 = Object.freeze({
	  default: _mathExpm1$1
	});

	var es6_math_expm1 = createCommonjsModule(function (module) {
	// 20.2.2.14 Math.expm1(x)
	var $export = interopDefault(require$$1$2)
	  , $expm1  = interopDefault(require$$0$24);

	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
	});

	interopDefault(es6_math_expm1);

	var es6_math_fround = createCommonjsModule(function (module) {
	// 20.2.2.16 Math.fround(x)
	var $export   = interopDefault(require$$1$2)
	  , sign      = interopDefault(require$$0$23)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);

	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};


	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});
	});

	interopDefault(es6_math_fround);

	var es6_math_hypot = createCommonjsModule(function (module) {
	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = interopDefault(require$$1$2)
	  , abs     = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});
	});

	interopDefault(es6_math_hypot);

	var es6_math_imul = createCommonjsModule(function (module) {
	// 20.2.2.18 Math.imul(x, y)
	var $export = interopDefault(require$$1$2)
	  , $imul   = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * interopDefault(require$$1$1)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});
	});

	interopDefault(es6_math_imul);

	var es6_math_log10 = createCommonjsModule(function (module) {
	// 20.2.2.21 Math.log10(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});
	});

	interopDefault(es6_math_log10);

	var es6_math_log1p = createCommonjsModule(function (module) {
	// 20.2.2.20 Math.log1p(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {log1p: interopDefault(require$$0$22)});
	});

	interopDefault(es6_math_log1p);

	var es6_math_log2 = createCommonjsModule(function (module) {
	// 20.2.2.22 Math.log2(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});
	});

	interopDefault(es6_math_log2);

	var es6_math_sign = createCommonjsModule(function (module) {
	// 20.2.2.28 Math.sign(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {sign: interopDefault(require$$0$23)});
	});

	interopDefault(es6_math_sign);

	var es6_math_sinh = createCommonjsModule(function (module) {
	// 20.2.2.30 Math.sinh(x)
	var $export = interopDefault(require$$1$2)
	  , expm1   = interopDefault(require$$0$24)
	  , exp     = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * interopDefault(require$$1$1)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});
	});

	interopDefault(es6_math_sinh);

	var es6_math_tanh = createCommonjsModule(function (module) {
	// 20.2.2.33 Math.tanh(x)
	var $export = interopDefault(require$$1$2)
	  , expm1   = interopDefault(require$$0$24)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});
	});

	interopDefault(es6_math_tanh);

	var es6_math_trunc = createCommonjsModule(function (module) {
	// 20.2.2.34 Math.trunc(x)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});
	});

	interopDefault(es6_math_trunc);

	var es6_string_fromCodePoint = createCommonjsModule(function (module) {
	var $export        = interopDefault(require$$1$2)
	  , toIndex        = interopDefault(require$$24)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});
	});

	interopDefault(es6_string_fromCodePoint);

	var es6_string_raw = createCommonjsModule(function (module) {
	var $export   = interopDefault(require$$1$2)
	  , toIObject = interopDefault(require$$1$7)
	  , toLength  = interopDefault(require$$3$1);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});
	});

	interopDefault(es6_string_raw);

	var es6_string_trim = createCommonjsModule(function (module) {
	'use strict';
	// 21.1.3.25 String.prototype.trim()
	interopDefault(require$$0$16)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});
	});

	interopDefault(es6_string_trim);

	var _stringAt = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$26)
	  , defined   = interopDefault(require$$4$3);
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


	var require$$0$25 = Object.freeze({
	  default: _stringAt$1
	});

	var _iterators = createCommonjsModule(function (module) {
	module.exports = {};
	});

	var _iterators$1 = interopDefault(_iterators);


	var require$$1$15 = Object.freeze({
		default: _iterators$1
	});

	var _iterCreate = createCommonjsModule(function (module) {
	'use strict';
	var create         = interopDefault(require$$6$1)
	  , descriptor     = interopDefault(require$$2$3)
	  , setToStringTag = interopDefault(require$$0$3)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	interopDefault(require$$2)(IteratorPrototype, interopDefault(require$$0$4)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};
	});

	var _iterCreate$1 = interopDefault(_iterCreate);


	var require$$0$26 = Object.freeze({
	  default: _iterCreate$1
	});

	var _iterDefine = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY        = interopDefault(require$$2$4)
	  , $export        = interopDefault(require$$1$2)
	  , redefine       = interopDefault(require$$4$2)
	  , hide           = interopDefault(require$$2)
	  , has            = interopDefault(require$$4)
	  , Iterators      = interopDefault(require$$1$15)
	  , $iterCreate    = interopDefault(require$$0$26)
	  , setToStringTag = interopDefault(require$$0$3)
	  , getPrototypeOf = interopDefault(require$$0$13)
	  , ITERATOR       = interopDefault(require$$0$4)('iterator')
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


	var require$$4$4 = Object.freeze({
	  default: _iterDefine$1
	});

	var es6_string_iterator = createCommonjsModule(function (module) {
	'use strict';
	var $at  = interopDefault(require$$0$25)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	interopDefault(require$$4$4)(String, 'String', function(iterated){
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

	var es6_string_codePointAt = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $at     = interopDefault(require$$0$25)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});
	});

	interopDefault(es6_string_codePointAt);

	var _isRegexp = createCommonjsModule(function (module) {
	// 7.2.8 IsRegExp(argument)
	var isObject = interopDefault(require$$0$1)
	  , cof      = interopDefault(require$$0$6)
	  , MATCH    = interopDefault(require$$0$4)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};
	});

	var _isRegexp$1 = interopDefault(_isRegexp);


	var require$$2$8 = Object.freeze({
	  default: _isRegexp$1
	});

	var _stringContext = createCommonjsModule(function (module) {
	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = interopDefault(require$$2$8)
	  , defined  = interopDefault(require$$4$3);

	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};
	});

	var _stringContext$1 = interopDefault(_stringContext);


	var require$$1$16 = Object.freeze({
	  default: _stringContext$1
	});

	var _failsIsRegexp = createCommonjsModule(function (module) {
	var MATCH = interopDefault(require$$0$4)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};
	});

	var _failsIsRegexp$1 = interopDefault(_failsIsRegexp);


	var require$$0$27 = Object.freeze({
	  default: _failsIsRegexp$1
	});

	var es6_string_endsWith = createCommonjsModule(function (module) {
	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = interopDefault(require$$1$2)
	  , toLength  = interopDefault(require$$3$1)
	  , context   = interopDefault(require$$1$16)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * interopDefault(require$$0$27)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});
	});

	interopDefault(es6_string_endsWith);

	var es6_string_includes = createCommonjsModule(function (module) {
	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = interopDefault(require$$1$2)
	  , context  = interopDefault(require$$1$16)
	  , INCLUDES = 'includes';

	$export($export.P + $export.F * interopDefault(require$$0$27)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	});

	interopDefault(es6_string_includes);

	var es6_string_repeat = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: interopDefault(require$$1$14)
	});
	});

	interopDefault(es6_string_repeat);

	var es6_string_startsWith = createCommonjsModule(function (module) {
	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = interopDefault(require$$1$2)
	  , toLength    = interopDefault(require$$3$1)
	  , context     = interopDefault(require$$1$16)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * interopDefault(require$$0$27)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});
	});

	interopDefault(es6_string_startsWith);

	var _stringHtml = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2)
	  , fails   = interopDefault(require$$1$1)
	  , defined = interopDefault(require$$4$3)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};
	});

	var _stringHtml$1 = interopDefault(_stringHtml);


	var require$$0$28 = Object.freeze({
	  default: _stringHtml$1
	});

	var es6_string_anchor = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	interopDefault(require$$0$28)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});
	});

	interopDefault(es6_string_anchor);

	var es6_string_big = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.3 String.prototype.big()
	interopDefault(require$$0$28)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});
	});

	interopDefault(es6_string_big);

	var es6_string_blink = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.4 String.prototype.blink()
	interopDefault(require$$0$28)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});
	});

	interopDefault(es6_string_blink);

	var es6_string_bold = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.5 String.prototype.bold()
	interopDefault(require$$0$28)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});
	});

	interopDefault(es6_string_bold);

	var es6_string_fixed = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.6 String.prototype.fixed()
	interopDefault(require$$0$28)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});
	});

	interopDefault(es6_string_fixed);

	var es6_string_fontcolor = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	interopDefault(require$$0$28)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});
	});

	interopDefault(es6_string_fontcolor);

	var es6_string_fontsize = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	interopDefault(require$$0$28)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});
	});

	interopDefault(es6_string_fontsize);

	var es6_string_italics = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.9 String.prototype.italics()
	interopDefault(require$$0$28)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});
	});

	interopDefault(es6_string_italics);

	var es6_string_link = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.10 String.prototype.link(url)
	interopDefault(require$$0$28)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});
	});

	interopDefault(es6_string_link);

	var es6_string_small = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.11 String.prototype.small()
	interopDefault(require$$0$28)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});
	});

	interopDefault(es6_string_small);

	var es6_string_strike = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.12 String.prototype.strike()
	interopDefault(require$$0$28)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});
	});

	interopDefault(es6_string_strike);

	var es6_string_sub = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.13 String.prototype.sub()
	interopDefault(require$$0$28)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});
	});

	interopDefault(es6_string_sub);

	var es6_string_sup = createCommonjsModule(function (module) {
	'use strict';
	// B.2.3.14 String.prototype.sup()
	interopDefault(require$$0$28)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});
	});

	interopDefault(es6_string_sup);

	var es6_date_now = createCommonjsModule(function (module) {
	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
	});

	interopDefault(es6_date_now);

	var es6_date_toJson = createCommonjsModule(function (module) {
	'use strict';
	var $export     = interopDefault(require$$1$2)
	  , toObject    = interopDefault(require$$5$1)
	  , toPrimitive = interopDefault(require$$4$1);

	$export($export.P + $export.F * interopDefault(require$$1$1)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});
	});

	interopDefault(es6_date_toJson);

	var es6_date_toIsoString = createCommonjsModule(function (module) {
	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = interopDefault(require$$1$2)
	  , fails   = interopDefault(require$$1$1)
	  , getTime = Date.prototype.getTime;

	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});
	});

	interopDefault(es6_date_toIsoString);

	var es6_date_toString = createCommonjsModule(function (module) {
	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  interopDefault(require$$4$2)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}
	});

	interopDefault(es6_date_toString);

	var _dateToPrimitive = createCommonjsModule(function (module) {
	'use strict';
	var anObject    = interopDefault(require$$5)
	  , toPrimitive = interopDefault(require$$4$1)
	  , NUMBER      = 'number';

	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};
	});

	var _dateToPrimitive$1 = interopDefault(_dateToPrimitive);


	var require$$0$29 = Object.freeze({
	  default: _dateToPrimitive$1
	});

	var es6_date_toPrimitive = createCommonjsModule(function (module) {
	var TO_PRIMITIVE = interopDefault(require$$0$4)('toPrimitive')
	  , proto        = Date.prototype;

	if(!(TO_PRIMITIVE in proto))interopDefault(require$$2)(proto, TO_PRIMITIVE, interopDefault(require$$0$29));
	});

	interopDefault(es6_date_toPrimitive);

	var es6_array_isArray = createCommonjsModule(function (module) {
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Array', {isArray: interopDefault(require$$1$10)});
	});

	interopDefault(es6_array_isArray);

	var _iterCall = createCommonjsModule(function (module) {
	// call something on iterator step with safe closing on error
	var anObject = interopDefault(require$$5);
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


	var require$$4$5 = Object.freeze({
	  default: _iterCall$1
	});

	var _isArrayIter = createCommonjsModule(function (module) {
	// check on default Array iterator
	var Iterators  = interopDefault(require$$1$15)
	  , ITERATOR   = interopDefault(require$$0$4)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};
	});

	var _isArrayIter$1 = interopDefault(_isArrayIter);


	var require$$17 = Object.freeze({
	  default: _isArrayIter$1
	});

	var _createProperty = createCommonjsModule(function (module) {
	'use strict';
	var $defineProperty = interopDefault(require$$2$1)
	  , createDesc      = interopDefault(require$$2$3);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};
	});

	var _createProperty$1 = interopDefault(_createProperty);


	var require$$0$30 = Object.freeze({
	  default: _createProperty$1
	});

	var core_getIteratorMethod = createCommonjsModule(function (module) {
	var classof   = interopDefault(require$$1$11)
	  , ITERATOR  = interopDefault(require$$0$4)('iterator')
	  , Iterators = interopDefault(require$$1$15);
	module.exports = interopDefault(require$$0).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};
	});

	var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);


	var require$$13 = Object.freeze({
	  default: core_getIteratorMethod$1
	});

	var _iterDetect = createCommonjsModule(function (module) {
	var ITERATOR     = interopDefault(require$$0$4)('iterator')
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


	var require$$5$2 = Object.freeze({
	  default: _iterDetect$1
	});

	var es6_array_from = createCommonjsModule(function (module) {
	'use strict';
	var ctx            = interopDefault(require$$31)
	  , $export        = interopDefault(require$$1$2)
	  , toObject       = interopDefault(require$$5$1)
	  , call           = interopDefault(require$$4$5)
	  , isArrayIter    = interopDefault(require$$17)
	  , toLength       = interopDefault(require$$3$1)
	  , createProperty = interopDefault(require$$0$30)
	  , getIterFn      = interopDefault(require$$13);

	$export($export.S + $export.F * !interopDefault(require$$5$2)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});
	});

	interopDefault(es6_array_from);

	var es6_array_of = createCommonjsModule(function (module) {
	'use strict';
	var $export        = interopDefault(require$$1$2)
	  , createProperty = interopDefault(require$$0$30);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * interopDefault(require$$1$1)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});
	});

	interopDefault(es6_array_of);

	var _strictMethod = createCommonjsModule(function (module) {
	var fails = interopDefault(require$$1$1);

	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};
	});

	var _strictMethod$1 = interopDefault(_strictMethod);


	var require$$0$31 = Object.freeze({
	  default: _strictMethod$1
	});

	var es6_array_join = createCommonjsModule(function (module) {
	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = interopDefault(require$$1$2)
	  , toIObject = interopDefault(require$$1$7)
	  , arrayJoin = [].join;

	// fallback for not array-like strings
	$export($export.P + $export.F * (interopDefault(require$$1$8) != Object || !interopDefault(require$$0$31)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});
	});

	interopDefault(es6_array_join);

	var es6_array_slice = createCommonjsModule(function (module) {
	'use strict';
	var $export    = interopDefault(require$$1$2)
	  , html       = interopDefault(require$$3$2)
	  , cof        = interopDefault(require$$0$6)
	  , toIndex    = interopDefault(require$$24)
	  , toLength   = interopDefault(require$$3$1)
	  , arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * interopDefault(require$$1$1)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	});

	interopDefault(es6_array_slice);

	var es6_array_sort = createCommonjsModule(function (module) {
	'use strict';
	var $export   = interopDefault(require$$1$2)
	  , aFunction = interopDefault(require$$0$2)
	  , toObject  = interopDefault(require$$5$1)
	  , fails     = interopDefault(require$$1$1)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];

	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !interopDefault(require$$0$31)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});
	});

	interopDefault(es6_array_sort);

	var _arraySpeciesConstructor = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$0$1)
	  , isArray  = interopDefault(require$$1$10)
	  , SPECIES  = interopDefault(require$$0$4)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};
	});

	var _arraySpeciesConstructor$1 = interopDefault(_arraySpeciesConstructor);


	var require$$0$33 = Object.freeze({
	  default: _arraySpeciesConstructor$1
	});

	var _arraySpeciesCreate = createCommonjsModule(function (module) {
	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = interopDefault(require$$0$33);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};
	});

	var _arraySpeciesCreate$1 = interopDefault(_arraySpeciesCreate);


	var require$$0$32 = Object.freeze({
	  default: _arraySpeciesCreate$1
	});

	var _arrayMethods = createCommonjsModule(function (module) {
	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = interopDefault(require$$31)
	  , IObject  = interopDefault(require$$1$8)
	  , toObject = interopDefault(require$$5$1)
	  , toLength = interopDefault(require$$3$1)
	  , asc      = interopDefault(require$$0$32);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};
	});

	var _arrayMethods$1 = interopDefault(_arrayMethods);


	var require$$10 = Object.freeze({
	  default: _arrayMethods$1
	});

	var es6_array_forEach = createCommonjsModule(function (module) {
	'use strict';
	var $export  = interopDefault(require$$1$2)
	  , $forEach = interopDefault(require$$10)(0)
	  , STRICT   = interopDefault(require$$0$31)([].forEach, true);

	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_forEach);

	var es6_array_map = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $map    = interopDefault(require$$10)(1);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_map);

	var es6_array_filter = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $filter = interopDefault(require$$10)(2);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_filter);

	var es6_array_some = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $some   = interopDefault(require$$10)(3);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_some);

	var es6_array_every = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $every  = interopDefault(require$$10)(4);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_every);

	var _arrayReduce = createCommonjsModule(function (module) {
	var aFunction = interopDefault(require$$0$2)
	  , toObject  = interopDefault(require$$5$1)
	  , IObject   = interopDefault(require$$1$8)
	  , toLength  = interopDefault(require$$3$1);

	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};
	});

	var _arrayReduce$1 = interopDefault(_arrayReduce);


	var require$$1$17 = Object.freeze({
	  default: _arrayReduce$1
	});

	var es6_array_reduce = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $reduce = interopDefault(require$$1$17);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});
	});

	interopDefault(es6_array_reduce);

	var es6_array_reduceRight = createCommonjsModule(function (module) {
	'use strict';
	var $export = interopDefault(require$$1$2)
	  , $reduce = interopDefault(require$$1$17);

	$export($export.P + $export.F * !interopDefault(require$$0$31)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});
	});

	interopDefault(es6_array_reduceRight);

	var es6_array_indexOf = createCommonjsModule(function (module) {
	'use strict';
	var $export       = interopDefault(require$$1$2)
	  , $indexOf      = interopDefault(require$$1$9)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});
	});

	interopDefault(es6_array_indexOf);

	var es6_array_lastIndexOf = createCommonjsModule(function (module) {
	'use strict';
	var $export       = interopDefault(require$$1$2)
	  , toIObject     = interopDefault(require$$1$7)
	  , toInteger     = interopDefault(require$$26)
	  , toLength      = interopDefault(require$$3$1)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$31)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});
	});

	interopDefault(es6_array_lastIndexOf);

	var _arrayCopyWithin = createCommonjsModule(function (module) {
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = interopDefault(require$$5$1)
	  , toIndex  = interopDefault(require$$24)
	  , toLength = interopDefault(require$$3$1);

	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};
	});

	var _arrayCopyWithin$1 = interopDefault(_arrayCopyWithin);


	var require$$2$9 = Object.freeze({
	  default: _arrayCopyWithin$1
	});

	var _addToUnscopables = createCommonjsModule(function (module) {
	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = interopDefault(require$$0$4)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)interopDefault(require$$2)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};
	});

	var _addToUnscopables$1 = interopDefault(_addToUnscopables);


	var require$$0$34 = Object.freeze({
	  default: _addToUnscopables$1
	});

	var es6_array_copyWithin = createCommonjsModule(function (module) {
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = interopDefault(require$$1$2);

	$export($export.P, 'Array', {copyWithin: interopDefault(require$$2$9)});

	interopDefault(require$$0$34)('copyWithin');
	});

	interopDefault(es6_array_copyWithin);

	var _arrayFill = createCommonjsModule(function (module) {
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = interopDefault(require$$5$1)
	  , toIndex  = interopDefault(require$$24)
	  , toLength = interopDefault(require$$3$1);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};
	});

	var _arrayFill$1 = interopDefault(_arrayFill);


	var require$$3$5 = Object.freeze({
	  default: _arrayFill$1
	});

	var es6_array_fill = createCommonjsModule(function (module) {
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = interopDefault(require$$1$2);

	$export($export.P, 'Array', {fill: interopDefault(require$$3$5)});

	interopDefault(require$$0$34)('fill');
	});

	interopDefault(es6_array_fill);

	var es6_array_find = createCommonjsModule(function (module) {
	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = interopDefault(require$$1$2)
	  , $find   = interopDefault(require$$10)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_find);

	var es6_array_findIndex = createCommonjsModule(function (module) {
	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = interopDefault(require$$1$2)
	  , $find   = interopDefault(require$$10)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	interopDefault(require$$0$34)(KEY);
	});

	interopDefault(es6_array_findIndex);

	var _setSpecies = createCommonjsModule(function (module) {
	'use strict';
	var global      = interopDefault(require$$3)
	  , dP          = interopDefault(require$$2$1)
	  , DESCRIPTORS = interopDefault(require$$1)
	  , SPECIES     = interopDefault(require$$0$4)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};
	});

	var _setSpecies$1 = interopDefault(_setSpecies);


	var require$$0$35 = Object.freeze({
	  default: _setSpecies$1
	});

	var es6_array_species = createCommonjsModule(function (module) {
	interopDefault(require$$0$35)('Array');
	});

	interopDefault(es6_array_species);

	var _iterStep = createCommonjsModule(function (module) {
	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};
	});

	var _iterStep$1 = interopDefault(_iterStep);


	var require$$3$6 = Object.freeze({
	  default: _iterStep$1
	});

	var es6_array_iterator = createCommonjsModule(function (module) {
	'use strict';
	var addToUnscopables = interopDefault(require$$0$34)
	  , step             = interopDefault(require$$3$6)
	  , Iterators        = interopDefault(require$$1$15)
	  , toIObject        = interopDefault(require$$1$7);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = interopDefault(require$$4$4)(Array, 'Array', function(iterated, kind){
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

	var es6_array_iterator$1 = interopDefault(es6_array_iterator);


	var require$$5$3 = Object.freeze({
	  default: es6_array_iterator$1
	});

	var _flags = createCommonjsModule(function (module) {
	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = interopDefault(require$$5);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};
	});

	var _flags$1 = interopDefault(_flags);


	var require$$1$18 = Object.freeze({
	  default: _flags$1
	});

	var es6_regexp_constructor = createCommonjsModule(function (module) {
	var global            = interopDefault(require$$3)
	  , inheritIfRequired = interopDefault(require$$0$19)
	  , dP                = interopDefault(require$$2$1).f
	  , gOPN              = interopDefault(require$$3$3).f
	  , isRegExp          = interopDefault(require$$2$8)
	  , $flags            = interopDefault(require$$1$18)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;

	if(interopDefault(require$$1) && (!CORRECT_NEW || interopDefault(require$$1$1)(function(){
	  re2[interopDefault(require$$0$4)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  interopDefault(require$$4$2)(global, 'RegExp', $RegExp);
	}

	interopDefault(require$$0$35)('RegExp');
	});

	interopDefault(es6_regexp_constructor);

	var es6_regexp_flags = createCommonjsModule(function (module) {
	// 21.2.5.3 get RegExp.prototype.flags()
	if(interopDefault(require$$1) && /./g.flags != 'g')interopDefault(require$$2$1).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: interopDefault(require$$1$18)
	});
	});

	interopDefault(es6_regexp_flags);

	var es6_regexp_toString = createCommonjsModule(function (module) {
	'use strict';

	var anObject    = interopDefault(require$$5)
	  , $flags      = interopDefault(require$$1$18)
	  , DESCRIPTORS = interopDefault(require$$1)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];

	var define = function(fn){
	  interopDefault(require$$4$2)(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if(interopDefault(require$$1$1)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}
	});

	interopDefault(es6_regexp_toString);

	var _fixReWks = createCommonjsModule(function (module) {
	'use strict';
	var hide     = interopDefault(require$$2)
	  , redefine = interopDefault(require$$4$2)
	  , fails    = interopDefault(require$$1$1)
	  , defined  = interopDefault(require$$4$3)
	  , wks      = interopDefault(require$$0$4);

	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};
	});

	var _fixReWks$1 = interopDefault(_fixReWks);


	var require$$1$19 = Object.freeze({
	  default: _fixReWks$1
	});

	var es6_regexp_match = createCommonjsModule(function (module) {
	// @@match logic
	interopDefault(require$$1$19)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});
	});

	interopDefault(es6_regexp_match);

	var es6_regexp_replace = createCommonjsModule(function (module) {
	// @@replace logic
	interopDefault(require$$1$19)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});
	});

	interopDefault(es6_regexp_replace);

	var es6_regexp_search = createCommonjsModule(function (module) {
	// @@search logic
	interopDefault(require$$1$19)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});
	});

	interopDefault(es6_regexp_search);

	var es6_regexp_split = createCommonjsModule(function (module) {
	// @@split logic
	interopDefault(require$$1$19)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = interopDefault(require$$2$8)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});
	});

	interopDefault(es6_regexp_split);

	var _anInstance = createCommonjsModule(function (module) {
	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};
	});

	var _anInstance$1 = interopDefault(_anInstance);


	var require$$4$6 = Object.freeze({
	  default: _anInstance$1
	});

	var _forOf = createCommonjsModule(function (module) {
	var ctx         = interopDefault(require$$31)
	  , call        = interopDefault(require$$4$5)
	  , isArrayIter = interopDefault(require$$17)
	  , anObject    = interopDefault(require$$5)
	  , toLength    = interopDefault(require$$3$1)
	  , getIterFn   = interopDefault(require$$13)
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


	var require$$1$20 = Object.freeze({
	  default: _forOf$1
	});

	var _speciesConstructor = createCommonjsModule(function (module) {
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = interopDefault(require$$5)
	  , aFunction = interopDefault(require$$0$2)
	  , SPECIES   = interopDefault(require$$0$4)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};
	});

	var _speciesConstructor$1 = interopDefault(_speciesConstructor);


	var require$$8 = Object.freeze({
	  default: _speciesConstructor$1
	});

	var _task = createCommonjsModule(function (module) {
	var ctx                = interopDefault(require$$31)
	  , invoke             = interopDefault(require$$1$13)
	  , html               = interopDefault(require$$3$2)
	  , cel                = interopDefault(require$$2$2)
	  , global             = interopDefault(require$$3)
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
	  if(interopDefault(require$$0$6)(process) == 'process'){
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
	var set$1 = _task.set;
	var clear = _task.clear;

var require$$0$36 = Object.freeze({
	  default: _task$1,
	  set: set$1,
	  clear: clear
	});

	var _microtask = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$3)
	  , macrotask = interopDefault(require$$0$36).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = interopDefault(require$$0$6)(process) == 'process';

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


	var require$$8$1 = Object.freeze({
	  default: _microtask$1
	});

	var _redefineAll = createCommonjsModule(function (module) {
	var redefine = interopDefault(require$$4$2);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};
	});

	var _redefineAll$1 = interopDefault(_redefineAll);


	var require$$3$7 = Object.freeze({
	  default: _redefineAll$1
	});

	var es6_promise = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY            = interopDefault(require$$2$4)
	  , global             = interopDefault(require$$3)
	  , ctx                = interopDefault(require$$31)
	  , classof            = interopDefault(require$$1$11)
	  , $export            = interopDefault(require$$1$2)
	  , isObject           = interopDefault(require$$0$1)
	  , aFunction          = interopDefault(require$$0$2)
	  , anInstance         = interopDefault(require$$4$6)
	  , forOf              = interopDefault(require$$1$20)
	  , speciesConstructor = interopDefault(require$$8)
	  , task               = interopDefault(require$$0$36).set
	  , microtask          = interopDefault(require$$8$1)()
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
	      , FakePromise = (promise.constructor = {})[interopDefault(require$$0$4)('species')] = function(exec){ exec(empty, empty); };
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
	  Internal.prototype = interopDefault(require$$3$7)($Promise.prototype, {
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
	interopDefault(require$$0$3)($Promise, PROMISE);
	interopDefault(require$$0$35)(PROMISE);
	Wrapper = interopDefault(require$$0)[PROMISE];

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
	$export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$5$2)(function(iter){
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

	var _collectionStrong = createCommonjsModule(function (module) {
	'use strict';
	var dP          = interopDefault(require$$2$1).f
	  , create      = interopDefault(require$$6$1)
	  , redefineAll = interopDefault(require$$3$7)
	  , ctx         = interopDefault(require$$31)
	  , anInstance  = interopDefault(require$$4$6)
	  , defined     = interopDefault(require$$4$3)
	  , forOf       = interopDefault(require$$1$20)
	  , $iterDefine = interopDefault(require$$4$4)
	  , step        = interopDefault(require$$3$6)
	  , setSpecies  = interopDefault(require$$0$35)
	  , DESCRIPTORS = interopDefault(require$$1)
	  , fastKey     = interopDefault(require$$6).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};
	});

	var _collectionStrong$1 = interopDefault(_collectionStrong);
	var getConstructor = _collectionStrong.getConstructor;
	var def = _collectionStrong.def;
	var getEntry = _collectionStrong.getEntry;
	var setStrong = _collectionStrong.setStrong;

var require$$1$21 = Object.freeze({
	  default: _collectionStrong$1,
	  getConstructor: getConstructor,
	  def: def,
	  getEntry: getEntry,
	  setStrong: setStrong
	});

	var _collection = createCommonjsModule(function (module) {
	'use strict';
	var global            = interopDefault(require$$3)
	  , $export           = interopDefault(require$$1$2)
	  , redefine          = interopDefault(require$$4$2)
	  , redefineAll       = interopDefault(require$$3$7)
	  , meta              = interopDefault(require$$6)
	  , forOf             = interopDefault(require$$1$20)
	  , anInstance        = interopDefault(require$$4$6)
	  , isObject          = interopDefault(require$$0$1)
	  , fails             = interopDefault(require$$1$1)
	  , $iterDetect       = interopDefault(require$$5$2)
	  , setToStringTag    = interopDefault(require$$0$3)
	  , inheritIfRequired = interopDefault(require$$0$19);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};
	});

	var _collection$1 = interopDefault(_collection);


	var require$$0$37 = Object.freeze({
	  default: _collection$1
	});

	var es6_map = createCommonjsModule(function (module) {
	'use strict';
	var strong = interopDefault(require$$1$21);

	// 23.1 Map Objects
	module.exports = interopDefault(require$$0$37)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);
	});

	var es6_map$1 = interopDefault(es6_map);


	var require$$3$8 = Object.freeze({
	  default: es6_map$1
	});

	var es6_set = createCommonjsModule(function (module) {
	'use strict';
	var strong = interopDefault(require$$1$21);

	// 23.2 Set Objects
	module.exports = interopDefault(require$$0$37)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);
	});

	var es6_set$1 = interopDefault(es6_set);


	var require$$4$7 = Object.freeze({
	  default: es6_set$1
	});

	var _collectionWeak = createCommonjsModule(function (module) {
	'use strict';
	var redefineAll       = interopDefault(require$$3$7)
	  , getWeak           = interopDefault(require$$6).getWeak
	  , anObject          = interopDefault(require$$5)
	  , isObject          = interopDefault(require$$0$1)
	  , anInstance        = interopDefault(require$$4$6)
	  , forOf             = interopDefault(require$$1$20)
	  , createArrayMethod = interopDefault(require$$10)
	  , $has              = interopDefault(require$$4)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};
	});

	var _collectionWeak$1 = interopDefault(_collectionWeak);
	var getConstructor$1 = _collectionWeak.getConstructor;
	var def$1 = _collectionWeak.def;
	var ufstore = _collectionWeak.ufstore;

var require$$1$22 = Object.freeze({
	  default: _collectionWeak$1,
	  getConstructor: getConstructor$1,
	  def: def$1,
	  ufstore: ufstore
	});

	var es6_weakMap = createCommonjsModule(function (module) {
	'use strict';
	var each         = interopDefault(require$$10)(0)
	  , redefine     = interopDefault(require$$4$2)
	  , meta         = interopDefault(require$$6)
	  , assign       = interopDefault(require$$3$4)
	  , weak         = interopDefault(require$$1$22)
	  , isObject     = interopDefault(require$$0$1)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;

	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = interopDefault(require$$0$37)('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var es6_weakMap$1 = interopDefault(es6_weakMap);


	var require$$0$38 = Object.freeze({
	  default: es6_weakMap$1
	});

	var es6_weakSet = createCommonjsModule(function (module) {
	'use strict';
	var weak = interopDefault(require$$1$22);

	// 23.4 WeakSet Objects
	interopDefault(require$$0$37)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);
	});

	interopDefault(es6_weakSet);

	var _typed = createCommonjsModule(function (module) {
	var global = interopDefault(require$$3)
	  , hide   = interopDefault(require$$2)
	  , uid    = interopDefault(require$$12)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};
	});

	var _typed$1 = interopDefault(_typed);
	var ABV = _typed.ABV;
	var CONSTR = _typed.CONSTR;
	var TYPED = _typed.TYPED;
	var VIEW = _typed.VIEW;

var require$$33 = Object.freeze({
	  default: _typed$1,
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	});

	var _typedBuffer = createCommonjsModule(function (module, exports) {
	'use strict';
	var global         = interopDefault(require$$3)
	  , DESCRIPTORS    = interopDefault(require$$1)
	  , LIBRARY        = interopDefault(require$$2$4)
	  , $typed         = interopDefault(require$$33)
	  , hide           = interopDefault(require$$2)
	  , redefineAll    = interopDefault(require$$3$7)
	  , fails          = interopDefault(require$$1$1)
	  , anInstance     = interopDefault(require$$4$6)
	  , toInteger      = interopDefault(require$$26)
	  , toLength       = interopDefault(require$$3$1)
	  , gOPN           = interopDefault(require$$3$3).f
	  , dP             = interopDefault(require$$2$1).f
	  , arrayFill      = interopDefault(require$$3$5)
	  , setToStringTag = interopDefault(require$$0$3)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};

	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};

	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};

	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};

	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};

	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var _typedBuffer$1 = interopDefault(_typedBuffer);


	var require$$32 = Object.freeze({
	  default: _typedBuffer$1
	});

	var es6_typed_arrayBuffer = createCommonjsModule(function (module) {
	'use strict';
	var $export      = interopDefault(require$$1$2)
	  , $typed       = interopDefault(require$$33)
	  , buffer       = interopDefault(require$$32)
	  , anObject     = interopDefault(require$$5)
	  , toIndex      = interopDefault(require$$24)
	  , toLength     = interopDefault(require$$3$1)
	  , isObject     = interopDefault(require$$0$1)
	  , ArrayBuffer  = interopDefault(require$$3).ArrayBuffer
	  , speciesConstructor = interopDefault(require$$8)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';

	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});

	$export($export.P + $export.U + $export.F * interopDefault(require$$1$1)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	interopDefault(require$$0$35)(ARRAY_BUFFER);
	});

	interopDefault(es6_typed_arrayBuffer);

	var es6_typed_dataView = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2);
	$export($export.G + $export.W + $export.F * !interopDefault(require$$33).ABV, {
	  DataView: interopDefault(require$$32).DataView
	});
	});

	interopDefault(es6_typed_dataView);

	var _typedArray = createCommonjsModule(function (module) {
	'use strict';
	if(interopDefault(require$$1)){
	  var LIBRARY             = interopDefault(require$$2$4)
	    , global              = interopDefault(require$$3)
	    , fails               = interopDefault(require$$1$1)
	    , $export             = interopDefault(require$$1$2)
	    , $typed              = interopDefault(require$$33)
	    , $buffer             = interopDefault(require$$32)
	    , ctx                 = interopDefault(require$$31)
	    , anInstance          = interopDefault(require$$4$6)
	    , propertyDesc        = interopDefault(require$$2$3)
	    , hide                = interopDefault(require$$2)
	    , redefineAll         = interopDefault(require$$3$7)
	    , toInteger           = interopDefault(require$$26)
	    , toLength            = interopDefault(require$$3$1)
	    , toIndex             = interopDefault(require$$24)
	    , toPrimitive         = interopDefault(require$$4$1)
	    , has                 = interopDefault(require$$4)
	    , same                = interopDefault(require$$21)
	    , classof             = interopDefault(require$$1$11)
	    , isObject            = interopDefault(require$$0$1)
	    , toObject            = interopDefault(require$$5$1)
	    , isArrayIter         = interopDefault(require$$17)
	    , create              = interopDefault(require$$6$1)
	    , getPrototypeOf      = interopDefault(require$$0$13)
	    , gOPN                = interopDefault(require$$3$3).f
	    , getIterFn           = interopDefault(require$$13)
	    , uid                 = interopDefault(require$$12)
	    , wks                 = interopDefault(require$$0$4)
	    , createArrayMethod   = interopDefault(require$$10)
	    , createArrayIncludes = interopDefault(require$$1$9)
	    , speciesConstructor  = interopDefault(require$$8)
	    , ArrayIterators      = interopDefault(require$$5$3)
	    , Iterators           = interopDefault(require$$1$15)
	    , $iterDetect         = interopDefault(require$$5$2)
	    , setSpecies          = interopDefault(require$$0$35)
	    , arrayFill           = interopDefault(require$$3$5)
	    , arrayCopyWithin     = interopDefault(require$$2$9)
	    , $DP                 = interopDefault(require$$2$1)
	    , $GOPD               = interopDefault(require$$2$7)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';

	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });

	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };

	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };

	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };

	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });

	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });

	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });

	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});

	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };
	});

	var _typedArray$1 = interopDefault(_typedArray);


	var require$$0$39 = Object.freeze({
	  default: _typedArray$1
	});

	var es6_typed_int8Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_int8Array);

	var es6_typed_uint8Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_uint8Array);

	var es6_typed_uint8ClampedArray = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);
	});

	interopDefault(es6_typed_uint8ClampedArray);

	var es6_typed_int16Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_int16Array);

	var es6_typed_uint16Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_uint16Array);

	var es6_typed_int32Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_int32Array);

	var es6_typed_uint32Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_uint32Array);

	var es6_typed_float32Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_float32Array);

	var es6_typed_float64Array = createCommonjsModule(function (module) {
	interopDefault(require$$0$39)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});
	});

	interopDefault(es6_typed_float64Array);

	var es6_reflect_apply = createCommonjsModule(function (module) {
	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = interopDefault(require$$1$2)
	  , aFunction = interopDefault(require$$0$2)
	  , anObject  = interopDefault(require$$5)
	  , rApply    = (interopDefault(require$$3).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !interopDefault(require$$1$1)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});
	});

	interopDefault(es6_reflect_apply);

	var es6_reflect_construct = createCommonjsModule(function (module) {
	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = interopDefault(require$$1$2)
	  , create     = interopDefault(require$$6$1)
	  , aFunction  = interopDefault(require$$0$2)
	  , anObject   = interopDefault(require$$5)
	  , isObject   = interopDefault(require$$0$1)
	  , fails      = interopDefault(require$$1$1)
	  , bind       = interopDefault(require$$1$12)
	  , rConstruct = (interopDefault(require$$3).Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});

	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});
	});

	interopDefault(es6_reflect_construct);

	var es6_reflect_defineProperty = createCommonjsModule(function (module) {
	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = interopDefault(require$$2$1)
	  , $export     = interopDefault(require$$1$2)
	  , anObject    = interopDefault(require$$5)
	  , toPrimitive = interopDefault(require$$4$1);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * interopDefault(require$$1$1)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});
	});

	interopDefault(es6_reflect_defineProperty);

	var es6_reflect_deleteProperty = createCommonjsModule(function (module) {
	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = interopDefault(require$$1$2)
	  , gOPD     = interopDefault(require$$2$7).f
	  , anObject = interopDefault(require$$5);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});
	});

	interopDefault(es6_reflect_deleteProperty);

	var es6_reflect_enumerate = createCommonjsModule(function (module) {
	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = interopDefault(require$$1$2)
	  , anObject = interopDefault(require$$5);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	interopDefault(require$$0$26)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});
	});

	interopDefault(es6_reflect_enumerate);

	var es6_reflect_get = createCommonjsModule(function (module) {
	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = interopDefault(require$$2$7)
	  , getPrototypeOf = interopDefault(require$$0$13)
	  , has            = interopDefault(require$$4)
	  , $export        = interopDefault(require$$1$2)
	  , isObject       = interopDefault(require$$0$1)
	  , anObject       = interopDefault(require$$5);

	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', {get: get});
	});

	interopDefault(es6_reflect_get);

	var es6_reflect_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = interopDefault(require$$2$7)
	  , $export  = interopDefault(require$$1$2)
	  , anObject = interopDefault(require$$5);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});
	});

	interopDefault(es6_reflect_getOwnPropertyDescriptor);

	var es6_reflect_getPrototypeOf = createCommonjsModule(function (module) {
	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = interopDefault(require$$1$2)
	  , getProto = interopDefault(require$$0$13)
	  , anObject = interopDefault(require$$5);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});
	});

	interopDefault(es6_reflect_getPrototypeOf);

	var es6_reflect_has = createCommonjsModule(function (module) {
	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});
	});

	interopDefault(es6_reflect_has);

	var es6_reflect_isExtensible = createCommonjsModule(function (module) {
	// 26.1.10 Reflect.isExtensible(target)
	var $export       = interopDefault(require$$1$2)
	  , anObject      = interopDefault(require$$5)
	  , $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});
	});

	interopDefault(es6_reflect_isExtensible);

	var _ownKeys = createCommonjsModule(function (module) {
	// all object keys, includes non-enumerable and symbols
	var gOPN     = interopDefault(require$$3$3)
	  , gOPS     = interopDefault(require$$2$6)
	  , anObject = interopDefault(require$$5)
	  , Reflect  = interopDefault(require$$3).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};
	});

	var _ownKeys$1 = interopDefault(_ownKeys);


	var require$$3$9 = Object.freeze({
	  default: _ownKeys$1
	});

	var es6_reflect_ownKeys = createCommonjsModule(function (module) {
	// 26.1.11 Reflect.ownKeys(target)
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Reflect', {ownKeys: interopDefault(require$$3$9)});
	});

	interopDefault(es6_reflect_ownKeys);

	var es6_reflect_preventExtensions = createCommonjsModule(function (module) {
	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = interopDefault(require$$1$2)
	  , anObject           = interopDefault(require$$5)
	  , $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});
	});

	interopDefault(es6_reflect_preventExtensions);

	var es6_reflect_set = createCommonjsModule(function (module) {
	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = interopDefault(require$$2$1)
	  , gOPD           = interopDefault(require$$2$7)
	  , getPrototypeOf = interopDefault(require$$0$13)
	  , has            = interopDefault(require$$4)
	  , $export        = interopDefault(require$$1$2)
	  , createDesc     = interopDefault(require$$2$3)
	  , anObject       = interopDefault(require$$5)
	  , isObject       = interopDefault(require$$0$1);

	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', {set: set});
	});

	interopDefault(es6_reflect_set);

	var es6_reflect_setPrototypeOf = createCommonjsModule(function (module) {
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = interopDefault(require$$1$2)
	  , setProto = interopDefault(require$$0$14);

	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});
	});

	interopDefault(es6_reflect_setPrototypeOf);

	var es7_array_includes = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = interopDefault(require$$1$2)
	  , $includes = interopDefault(require$$1$9)(true);

	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	interopDefault(require$$0$34)('includes');
	});

	interopDefault(es7_array_includes);

	var es7_string_at = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = interopDefault(require$$1$2)
	  , $at     = interopDefault(require$$0$25)(true);

	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});
	});

	interopDefault(es7_string_at);

	var _stringPad = createCommonjsModule(function (module) {
	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = interopDefault(require$$3$1)
	  , repeat   = interopDefault(require$$1$14)
	  , defined  = interopDefault(require$$4$3);

	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};
	});

	var _stringPad$1 = interopDefault(_stringPad);


	var require$$0$40 = Object.freeze({
	  default: _stringPad$1
	});

	var es7_string_padStart = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = interopDefault(require$$1$2)
	  , $pad    = interopDefault(require$$0$40);

	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});
	});

	interopDefault(es7_string_padStart);

	var es7_string_padEnd = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = interopDefault(require$$1$2)
	  , $pad    = interopDefault(require$$0$40);

	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});
	});

	interopDefault(es7_string_padEnd);

	var es7_string_trimLeft = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	interopDefault(require$$0$16)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');
	});

	interopDefault(es7_string_trimLeft);

	var es7_string_trimRight = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	interopDefault(require$$0$16)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');
	});

	interopDefault(es7_string_trimRight);

	var es7_string_matchAll = createCommonjsModule(function (module) {
	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = interopDefault(require$$1$2)
	  , defined     = interopDefault(require$$4$3)
	  , toLength    = interopDefault(require$$3$1)
	  , isRegExp    = interopDefault(require$$2$8)
	  , getFlags    = interopDefault(require$$1$18)
	  , RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};

	interopDefault(require$$0$26)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});

	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});
	});

	interopDefault(es7_string_matchAll);

	var es7_symbol_asyncIterator = createCommonjsModule(function (module) {
	interopDefault(require$$0$5)('asyncIterator');
	});

	interopDefault(es7_symbol_asyncIterator);

	var es7_symbol_observable = createCommonjsModule(function (module) {
	interopDefault(require$$0$5)('observable');
	});

	interopDefault(es7_symbol_observable);

	var es7_object_getOwnPropertyDescriptors = createCommonjsModule(function (module) {
	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = interopDefault(require$$1$2)
	  , ownKeys        = interopDefault(require$$3$9)
	  , toIObject      = interopDefault(require$$1$7)
	  , gOPD           = interopDefault(require$$2$7)
	  , createProperty = interopDefault(require$$0$30);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});
	});

	interopDefault(es7_object_getOwnPropertyDescriptors);

	var _objectToArray = createCommonjsModule(function (module) {
	var getKeys   = interopDefault(require$$2$5)
	  , toIObject = interopDefault(require$$1$7)
	  , isEnum    = interopDefault(require$$0$9).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};
	});

	var _objectToArray$1 = interopDefault(_objectToArray);


	var require$$0$41 = Object.freeze({
	  default: _objectToArray$1
	});

	var es7_object_values = createCommonjsModule(function (module) {
	// https://github.com/tc39/proposal-object-values-entries
	var $export = interopDefault(require$$1$2)
	  , $values = interopDefault(require$$0$41)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});
	});

	interopDefault(es7_object_values);

	var es7_object_entries = createCommonjsModule(function (module) {
	// https://github.com/tc39/proposal-object-values-entries
	var $export  = interopDefault(require$$1$2)
	  , $entries = interopDefault(require$$0$41)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});
	});

	interopDefault(es7_object_entries);

	var _objectForcedPam = createCommonjsModule(function (module) {
	// Forced replacement prototype accessors methods
	module.exports = interopDefault(require$$2$4)|| !interopDefault(require$$1$1)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete interopDefault(require$$3)[K];
	});
	});

	var _objectForcedPam$1 = interopDefault(_objectForcedPam);


	var require$$0$42 = Object.freeze({
	  default: _objectForcedPam$1
	});

	var es7_object_defineGetter = createCommonjsModule(function (module) {
	'use strict';
	var $export         = interopDefault(require$$1$2)
	  , toObject        = interopDefault(require$$5$1)
	  , aFunction       = interopDefault(require$$0$2)
	  , $defineProperty = interopDefault(require$$2$1);

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});
	});

	interopDefault(es7_object_defineGetter);

	var es7_object_defineSetter = createCommonjsModule(function (module) {
	'use strict';
	var $export         = interopDefault(require$$1$2)
	  , toObject        = interopDefault(require$$5$1)
	  , aFunction       = interopDefault(require$$0$2)
	  , $defineProperty = interopDefault(require$$2$1);

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});
	});

	interopDefault(es7_object_defineSetter);

	var es7_object_lookupGetter = createCommonjsModule(function (module) {
	'use strict';
	var $export                  = interopDefault(require$$1$2)
	  , toObject                 = interopDefault(require$$5$1)
	  , toPrimitive              = interopDefault(require$$4$1)
	  , getPrototypeOf           = interopDefault(require$$0$13)
	  , getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});
	});

	interopDefault(es7_object_lookupGetter);

	var es7_object_lookupSetter = createCommonjsModule(function (module) {
	'use strict';
	var $export                  = interopDefault(require$$1$2)
	  , toObject                 = interopDefault(require$$5$1)
	  , toPrimitive              = interopDefault(require$$4$1)
	  , getPrototypeOf           = interopDefault(require$$0$13)
	  , getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$42), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});
	});

	interopDefault(es7_object_lookupSetter);

	var _arrayFromIterable = createCommonjsModule(function (module) {
	var forOf = interopDefault(require$$1$20);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};
	});

	var _arrayFromIterable$1 = interopDefault(_arrayFromIterable);


	var require$$3$10 = Object.freeze({
	  default: _arrayFromIterable$1
	});

	var _collectionToJson = createCommonjsModule(function (module) {
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = interopDefault(require$$1$11)
	  , from    = interopDefault(require$$3$10);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};
	});

	var _collectionToJson$1 = interopDefault(_collectionToJson);


	var require$$0$43 = Object.freeze({
	  default: _collectionToJson$1
	});

	var es7_map_toJson = createCommonjsModule(function (module) {
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = interopDefault(require$$1$2);

	$export($export.P + $export.R, 'Map', {toJSON: interopDefault(require$$0$43)('Map')});
	});

	interopDefault(es7_map_toJson);

	var es7_set_toJson = createCommonjsModule(function (module) {
	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = interopDefault(require$$1$2);

	$export($export.P + $export.R, 'Set', {toJSON: interopDefault(require$$0$43)('Set')});
	});

	interopDefault(es7_set_toJson);

	var es7_system_global = createCommonjsModule(function (module) {
	// https://github.com/ljharb/proposal-global
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'System', {global: interopDefault(require$$3)});
	});

	interopDefault(es7_system_global);

	var es7_error_isError = createCommonjsModule(function (module) {
	// https://github.com/ljharb/proposal-is-error
	var $export = interopDefault(require$$1$2)
	  , cof     = interopDefault(require$$0$6);

	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});
	});

	interopDefault(es7_error_isError);

	var es7_math_iaddh = createCommonjsModule(function (module) {
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});
	});

	interopDefault(es7_math_iaddh);

	var es7_math_isubh = createCommonjsModule(function (module) {
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});
	});

	interopDefault(es7_math_isubh);

	var es7_math_imulh = createCommonjsModule(function (module) {
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});
	});

	interopDefault(es7_math_imulh);

	var es7_math_umulh = createCommonjsModule(function (module) {
	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = interopDefault(require$$1$2);

	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});
	});

	interopDefault(es7_math_umulh);

	var _metadata = createCommonjsModule(function (module) {
	var Map     = interopDefault(require$$3$8)
	  , $export = interopDefault(require$$1$2)
	  , shared  = interopDefault(require$$1$4)('metadata')
	  , store   = shared.store || (shared.store = new (interopDefault(require$$0$38)));

	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};

	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};
	});

	var _metadata$1 = interopDefault(_metadata);
	var store = _metadata.store;
	var map = _metadata.map;
	var has = _metadata.has;
	var get = _metadata.get;
	var set$2 = _metadata.set;
	var keys = _metadata.keys;
	var key = _metadata.key;
	var exp = _metadata.exp;

var require$$2$10 = Object.freeze({
	  default: _metadata$1,
	  store: store,
	  map: map,
	  has: has,
	  get: get,
	  set: set$2,
	  keys: keys,
	  key: key,
	  exp: exp
	});

	var es7_reflect_defineMetadata = createCommonjsModule(function (module) {
	var metadata                  = interopDefault(require$$2$10)
	  , anObject                  = interopDefault(require$$5)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});
	});

	interopDefault(es7_reflect_defineMetadata);

	var es7_reflect_deleteMetadata = createCommonjsModule(function (module) {
	var metadata               = interopDefault(require$$2$10)
	  , anObject               = interopDefault(require$$5)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;

	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});
	});

	interopDefault(es7_reflect_deleteMetadata);

	var es7_reflect_getMetadata = createCommonjsModule(function (module) {
	var metadata               = interopDefault(require$$2$10)
	  , anObject               = interopDefault(require$$5)
	  , getPrototypeOf         = interopDefault(require$$0$13)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;

	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});
	});

	interopDefault(es7_reflect_getMetadata);

	var es7_reflect_getMetadataKeys = createCommonjsModule(function (module) {
	var Set                     = interopDefault(require$$4$7)
	  , from                    = interopDefault(require$$3$10)
	  , metadata                = interopDefault(require$$2$10)
	  , anObject                = interopDefault(require$$5)
	  , getPrototypeOf          = interopDefault(require$$0$13)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;

	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});
	});

	interopDefault(es7_reflect_getMetadataKeys);

	var es7_reflect_getOwnMetadata = createCommonjsModule(function (module) {
	var metadata               = interopDefault(require$$2$10)
	  , anObject               = interopDefault(require$$5)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;

	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});
	});

	interopDefault(es7_reflect_getOwnMetadata);

	var es7_reflect_getOwnMetadataKeys = createCommonjsModule(function (module) {
	var metadata                = interopDefault(require$$2$10)
	  , anObject                = interopDefault(require$$5)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;

	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});
	});

	interopDefault(es7_reflect_getOwnMetadataKeys);

	var es7_reflect_hasMetadata = createCommonjsModule(function (module) {
	var metadata               = interopDefault(require$$2$10)
	  , anObject               = interopDefault(require$$5)
	  , getPrototypeOf         = interopDefault(require$$0$13)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;

	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});
	});

	interopDefault(es7_reflect_hasMetadata);

	var es7_reflect_hasOwnMetadata = createCommonjsModule(function (module) {
	var metadata               = interopDefault(require$$2$10)
	  , anObject               = interopDefault(require$$5)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;

	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});
	});

	interopDefault(es7_reflect_hasOwnMetadata);

	var es7_reflect_metadata = createCommonjsModule(function (module) {
	var metadata                  = interopDefault(require$$2$10)
	  , anObject                  = interopDefault(require$$5)
	  , aFunction                 = interopDefault(require$$0$2)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});
	});

	interopDefault(es7_reflect_metadata);

	var es7_asap = createCommonjsModule(function (module) {
	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = interopDefault(require$$1$2)
	  , microtask = interopDefault(require$$8$1)()
	  , process   = interopDefault(require$$3).process
	  , isNode    = interopDefault(require$$0$6)(process) == 'process';

	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});
	});

	interopDefault(es7_asap);

	var es7_observable = createCommonjsModule(function (module) {
	'use strict';
	// https://github.com/zenparsing/es-observable
	var $export     = interopDefault(require$$1$2)
	  , global      = interopDefault(require$$3)
	  , core        = interopDefault(require$$0)
	  , microtask   = interopDefault(require$$8$1)()
	  , OBSERVABLE  = interopDefault(require$$0$4)('observable')
	  , aFunction   = interopDefault(require$$0$2)
	  , anObject    = interopDefault(require$$5)
	  , anInstance  = interopDefault(require$$4$6)
	  , redefineAll = interopDefault(require$$3$7)
	  , hide        = interopDefault(require$$2)
	  , forOf       = interopDefault(require$$1$20)
	  , RETURN      = forOf.RETURN;

	var getMethod = function(fn){
	  return fn == null ? undefined : aFunction(fn);
	};

	var cleanupSubscription = function(subscription){
	  var cleanup = subscription._c;
	  if(cleanup){
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function(subscription){
	  return subscription._o === undefined;
	};

	var closeSubscription = function(subscription){
	  if(!subscriptionClosed(subscription)){
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function(observer, subscriber){
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup      = subscriber(observer)
	      , subscription = cleanup;
	    if(cleanup != null){
	      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch(e){
	    observer.error(e);
	    return;
	  } if(subscriptionClosed(this))cleanupSubscription(this);
	};

	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe(){ closeSubscription(this); }
	});

	var SubscriptionObserver = function(subscription){
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if(m)return m.call(observer, value);
	      } catch(e){
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value){
	    var subscription = this._s;
	    if(subscriptionClosed(subscription))throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if(!m)throw value;
	      value = m.call(observer, value);
	    } catch(e){
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch(e){
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber){
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};

	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer){
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn){
	    var that = this;
	    return new (core.Promise || global.Promise)(function(resolve, reject){
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next : function(value){
	          try {
	            return fn(value);
	          } catch(e){
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	redefineAll($Observable, {
	  from: function from(x){
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if(method){
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function(observer){
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          try {
	            if(forOf(x, false, function(it){
	              observer.next(it);
	              if(done)return RETURN;
	            }) === RETURN)return;
	          } catch(e){
	            if(done)throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  },
	  of: function of(){
	    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          for(var i = 0; i < items.length; ++i){
	            observer.next(items[i]);
	            if(done)return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  }
	});

	hide($Observable.prototype, OBSERVABLE, function(){ return this; });

	$export($export.G, {Observable: $Observable});

	interopDefault(require$$0$35)('Observable');
	});

	interopDefault(es7_observable);

	var _path = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$3);
	});

	var _path$1 = interopDefault(_path);


	var require$$2$11 = Object.freeze({
		default: _path$1
	});

	var _partial = createCommonjsModule(function (module) {
	'use strict';
	var path      = interopDefault(require$$2$11)
	  , invoke    = interopDefault(require$$1$13)
	  , aFunction = interopDefault(require$$0$2);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};
	});

	var _partial$1 = interopDefault(_partial);


	var require$$0$44 = Object.freeze({
	  default: _partial$1
	});

	var web_timers = createCommonjsModule(function (module) {
	// ie9- setTimeout & setInterval additional parameters fix
	var global     = interopDefault(require$$3)
	  , $export    = interopDefault(require$$1$2)
	  , invoke     = interopDefault(require$$1$13)
	  , partial    = interopDefault(require$$0$44)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});
	});

	interopDefault(web_timers);

	var web_immediate = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$2)
	  , $task   = interopDefault(require$$0$36);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});
	});

	interopDefault(web_immediate);

	var web_dom_iterable = createCommonjsModule(function (module) {
	var $iterators    = interopDefault(require$$5$3)
	  , redefine      = interopDefault(require$$4$2)
	  , global        = interopDefault(require$$3)
	  , hide          = interopDefault(require$$2)
	  , Iterators     = interopDefault(require$$1$15)
	  , wks           = interopDefault(require$$0$4)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}
	});

	interopDefault(web_dom_iterable);

	var shim = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0);
	});

	interopDefault(shim);

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


	var require$$0$45 = Object.freeze({
	  default: runtime$1
	});

	var _replacer = createCommonjsModule(function (module) {
	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};
	});

	var _replacer$1 = interopDefault(_replacer);


	var require$$0$46 = Object.freeze({
	  default: _replacer$1
	});

	var core_regexp_escape = createCommonjsModule(function (module) {
	// https://github.com/benjamingr/RexExp.escape
	var $export = interopDefault(require$$1$2)
	  , $re     = interopDefault(require$$0$46)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});
	});

	interopDefault(core_regexp_escape);

	var _escape = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0).RegExp.escape;
	});

	interopDefault(_escape);

	var index = createCommonjsModule(function (module) {
	"use strict";







	/* eslint max-len: 0 */

	if (commonjsGlobal._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	commonjsGlobal._babelPolyfill = true;

	// Should be removed in the next major release:

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	});

	interopDefault(index);

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

	module.exports = interopDefault(require$$0$45);

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


	var require$$0$47 = Object.freeze({
	  default: runtimeModule$1
	});

	var index$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$47);
	});

	var _regeneratorRuntime = interopDefault(index$2);

	var _toInteger$2 = createCommonjsModule(function (module) {
	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};
	});

	var _toInteger$3 = interopDefault(_toInteger$2);


	var require$$0$50 = Object.freeze({
	  default: _toInteger$3
	});

	var _defined$2 = createCommonjsModule(function (module) {
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};
	});

	var _defined$3 = interopDefault(_defined$2);


	var require$$0$51 = Object.freeze({
	  default: _defined$3
	});

	var _stringAt$2 = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$0$50)
	  , defined   = interopDefault(require$$0$51);
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

	var _stringAt$3 = interopDefault(_stringAt$2);


	var require$$1$23 = Object.freeze({
	  default: _stringAt$3
	});

	var _library$2 = createCommonjsModule(function (module) {
	module.exports = true;
	});

	var _library$3 = interopDefault(_library$2);


	var require$$17$1 = Object.freeze({
		default: _library$3
	});

	var _global$2 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var _global$3 = interopDefault(_global$2);


	var require$$4$8 = Object.freeze({
	  default: _global$3
	});

	var _core$2 = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

	var _core$3 = interopDefault(_core$2);
	var version$1 = _core$2.version;

var require$$0$53 = Object.freeze({
		default: _core$3,
		version: version$1
	});

	var _aFunction$2 = createCommonjsModule(function (module) {
	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};
	});

	var _aFunction$3 = interopDefault(_aFunction$2);


	var require$$1$25 = Object.freeze({
	  default: _aFunction$3
	});

	var _ctx$2 = createCommonjsModule(function (module) {
	// optional / simple context binding
	var aFunction = interopDefault(require$$1$25);
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

	var _ctx$3 = interopDefault(_ctx$2);


	var require$$5$4 = Object.freeze({
	  default: _ctx$3
	});

	var _isObject$2 = createCommonjsModule(function (module) {
	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};
	});

	var _isObject$3 = interopDefault(_isObject$2);


	var require$$12$1 = Object.freeze({
	  default: _isObject$3
	});

	var _anObject$2 = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$12$1);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	});

	var _anObject$3 = interopDefault(_anObject$2);


	var require$$2$12 = Object.freeze({
	  default: _anObject$3
	});

	var _fails$2 = createCommonjsModule(function (module) {
	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};
	});

	var _fails$3 = interopDefault(_fails$2);


	var require$$0$56 = Object.freeze({
	  default: _fails$3
	});

	var _descriptors$2 = createCommonjsModule(function (module) {
	// Thank's IE8 for his funny defineProperty
	module.exports = !interopDefault(require$$0$56)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _descriptors$3 = interopDefault(_descriptors$2);


	var require$$1$26 = Object.freeze({
	  default: _descriptors$3
	});

	var _domCreate$2 = createCommonjsModule(function (module) {
	var isObject = interopDefault(require$$12$1)
	  , document = interopDefault(require$$4$8).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};
	});

	var _domCreate$3 = interopDefault(_domCreate$2);


	var require$$2$14 = Object.freeze({
	  default: _domCreate$3
	});

	var _ie8DomDefine$2 = createCommonjsModule(function (module) {
	module.exports = !interopDefault(require$$1$26) && !interopDefault(require$$0$56)(function(){
	  return Object.defineProperty(interopDefault(require$$2$14)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});
	});

	var _ie8DomDefine$3 = interopDefault(_ie8DomDefine$2);


	var require$$2$13 = Object.freeze({
	  default: _ie8DomDefine$3
	});

	var _toPrimitive$2 = createCommonjsModule(function (module) {
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = interopDefault(require$$12$1);
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

	var _toPrimitive$3 = interopDefault(_toPrimitive$2);


	var require$$1$27 = Object.freeze({
	  default: _toPrimitive$3
	});

	var _objectDp$2 = createCommonjsModule(function (module, exports) {
	var anObject       = interopDefault(require$$2$12)
	  , IE8_DOM_DEFINE = interopDefault(require$$2$13)
	  , toPrimitive    = interopDefault(require$$1$27)
	  , dP             = Object.defineProperty;

	exports.f = interopDefault(require$$1$26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

	var _objectDp$3 = interopDefault(_objectDp$2);
	var f$7 = _objectDp$2.f;

var require$$0$55 = Object.freeze({
	  default: _objectDp$3,
	  f: f$7
	});

	var _propertyDesc$2 = createCommonjsModule(function (module) {
	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};
	});

	var _propertyDesc$3 = interopDefault(_propertyDesc$2);


	var require$$3$11 = Object.freeze({
	  default: _propertyDesc$3
	});

	var _hide$2 = createCommonjsModule(function (module) {
	var dP         = interopDefault(require$$0$55)
	  , createDesc = interopDefault(require$$3$11);
	module.exports = interopDefault(require$$1$26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};
	});

	var _hide$3 = interopDefault(_hide$2);


	var require$$0$54 = Object.freeze({
	  default: _hide$3
	});

	var _export$2 = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$4$8)
	  , core      = interopDefault(require$$0$53)
	  , ctx       = interopDefault(require$$5$4)
	  , hide      = interopDefault(require$$0$54)
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

	var _export$3 = interopDefault(_export$2);


	var require$$1$24 = Object.freeze({
	  default: _export$3
	});

	var _redefine$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$54);
	});

	var _redefine$3 = interopDefault(_redefine$2);


	var require$$7 = Object.freeze({
		default: _redefine$3
	});

	var _has$2 = createCommonjsModule(function (module) {
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};
	});

	var _has$3 = interopDefault(_has$2);


	var require$$2$15 = Object.freeze({
	  default: _has$3
	});

	var _iterators$2 = createCommonjsModule(function (module) {
	module.exports = {};
	});

	var _iterators$3 = interopDefault(_iterators$2);


	var require$$1$28 = Object.freeze({
		default: _iterators$3
	});

	var _cof$2 = createCommonjsModule(function (module) {
	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};
	});

	var _cof$3 = interopDefault(_cof$2);


	var require$$0$57 = Object.freeze({
	  default: _cof$3
	});

	var _iobject$2 = createCommonjsModule(function (module) {
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = interopDefault(require$$0$57);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};
	});

	var _iobject$3 = interopDefault(_iobject$2);


	var require$$1$31 = Object.freeze({
	  default: _iobject$3
	});

	var _toIobject$2 = createCommonjsModule(function (module) {
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = interopDefault(require$$1$31)
	  , defined = interopDefault(require$$0$51);
	module.exports = function(it){
	  return IObject(defined(it));
	};
	});

	var _toIobject$3 = interopDefault(_toIobject$2);


	var require$$1$30 = Object.freeze({
	  default: _toIobject$3
	});

	var _toLength$2 = createCommonjsModule(function (module) {
	// 7.1.15 ToLength
	var toInteger = interopDefault(require$$0$50)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};
	});

	var _toLength$3 = interopDefault(_toLength$2);


	var require$$1$33 = Object.freeze({
	  default: _toLength$3
	});

	var _toIndex$2 = createCommonjsModule(function (module) {
	var toInteger = interopDefault(require$$0$50)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};
	});

	var _toIndex$3 = interopDefault(_toIndex$2);


	var require$$0$58 = Object.freeze({
	  default: _toIndex$3
	});

	var _arrayIncludes$2 = createCommonjsModule(function (module) {
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = interopDefault(require$$1$30)
	  , toLength  = interopDefault(require$$1$33)
	  , toIndex   = interopDefault(require$$0$58);
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

	var _arrayIncludes$3 = interopDefault(_arrayIncludes$2);


	var require$$1$32 = Object.freeze({
	  default: _arrayIncludes$3
	});

	var _shared$2 = createCommonjsModule(function (module) {
	var global = interopDefault(require$$4$8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};
	});

	var _shared$3 = interopDefault(_shared$2);


	var require$$2$16 = Object.freeze({
	  default: _shared$3
	});

	var _uid$2 = createCommonjsModule(function (module) {
	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};
	});

	var _uid$3 = interopDefault(_uid$2);


	var require$$1$34 = Object.freeze({
	  default: _uid$3
	});

	var _sharedKey$2 = createCommonjsModule(function (module) {
	var shared = interopDefault(require$$2$16)('keys')
	  , uid    = interopDefault(require$$1$34);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};
	});

	var _sharedKey$3 = interopDefault(_sharedKey$2);


	var require$$0$59 = Object.freeze({
	  default: _sharedKey$3
	});

	var _objectKeysInternal$2 = createCommonjsModule(function (module) {
	var has          = interopDefault(require$$2$15)
	  , toIObject    = interopDefault(require$$1$30)
	  , arrayIndexOf = interopDefault(require$$1$32)(false)
	  , IE_PROTO     = interopDefault(require$$0$59)('IE_PROTO');

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

	var _objectKeysInternal$3 = interopDefault(_objectKeysInternal$2);


	var require$$1$29 = Object.freeze({
	  default: _objectKeysInternal$3
	});

	var _enumBugKeys$2 = createCommonjsModule(function (module) {
	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');
	});

	var _enumBugKeys$3 = interopDefault(_enumBugKeys$2);


	var require$$0$60 = Object.freeze({
	  default: _enumBugKeys$3
	});

	var _objectKeys$2 = createCommonjsModule(function (module) {
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = interopDefault(require$$1$29)
	  , enumBugKeys = interopDefault(require$$0$60);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};
	});

	var _objectKeys$3 = interopDefault(_objectKeys$2);


	var require$$5$5 = Object.freeze({
	  default: _objectKeys$3
	});

	var _objectDps$2 = createCommonjsModule(function (module) {
	var dP       = interopDefault(require$$0$55)
	  , anObject = interopDefault(require$$2$12)
	  , getKeys  = interopDefault(require$$5$5);

	module.exports = interopDefault(require$$1$26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};
	});

	var _objectDps$3 = interopDefault(_objectDps$2);


	var require$$4$10 = Object.freeze({
	  default: _objectDps$3
	});

	var _html$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$4$8).document && document.documentElement;
	});

	var _html$3 = interopDefault(_html$2);


	var require$$3$13 = Object.freeze({
		default: _html$3
	});

	var _objectCreate$2 = createCommonjsModule(function (module) {
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = interopDefault(require$$2$12)
	  , dPs         = interopDefault(require$$4$10)
	  , enumBugKeys = interopDefault(require$$0$60)
	  , IE_PROTO    = interopDefault(require$$0$59)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = interopDefault(require$$2$14)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  interopDefault(require$$3$13).appendChild(iframe);
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

	var _objectCreate$3 = interopDefault(_objectCreate$2);


	var require$$4$9 = Object.freeze({
	  default: _objectCreate$3
	});

	var _wks$2 = createCommonjsModule(function (module) {
	var store      = interopDefault(require$$2$16)('wks')
	  , uid        = interopDefault(require$$1$34)
	  , Symbol     = interopDefault(require$$4$8).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$3 = interopDefault(_wks$2);


	var require$$0$61 = Object.freeze({
	  default: _wks$3
	});

	var _setToStringTag$2 = createCommonjsModule(function (module) {
	var def = interopDefault(require$$0$55).f
	  , has = interopDefault(require$$2$15)
	  , TAG = interopDefault(require$$0$61)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};
	});

	var _setToStringTag$3 = interopDefault(_setToStringTag$2);


	var require$$3$14 = Object.freeze({
	  default: _setToStringTag$3
	});

	var _iterCreate$2 = createCommonjsModule(function (module) {
	'use strict';
	var create         = interopDefault(require$$4$9)
	  , descriptor     = interopDefault(require$$3$11)
	  , setToStringTag = interopDefault(require$$3$14)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	interopDefault(require$$0$54)(IteratorPrototype, interopDefault(require$$0$61)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};
	});

	var _iterCreate$3 = interopDefault(_iterCreate$2);


	var require$$3$12 = Object.freeze({
	  default: _iterCreate$3
	});

	var _toObject$2 = createCommonjsModule(function (module) {
	// 7.1.13 ToObject(argument)
	var defined = interopDefault(require$$0$51);
	module.exports = function(it){
	  return Object(defined(it));
	};
	});

	var _toObject$3 = interopDefault(_toObject$2);


	var require$$2$17 = Object.freeze({
	  default: _toObject$3
	});

	var _objectGpo$2 = createCommonjsModule(function (module) {
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = interopDefault(require$$2$15)
	  , toObject    = interopDefault(require$$2$17)
	  , IE_PROTO    = interopDefault(require$$0$59)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};
	});

	var _objectGpo$3 = interopDefault(_objectGpo$2);


	var require$$1$35 = Object.freeze({
	  default: _objectGpo$3
	});

	var _iterDefine$2 = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY        = interopDefault(require$$17$1)
	  , $export        = interopDefault(require$$1$24)
	  , redefine       = interopDefault(require$$7)
	  , hide           = interopDefault(require$$0$54)
	  , has            = interopDefault(require$$2$15)
	  , Iterators      = interopDefault(require$$1$28)
	  , $iterCreate    = interopDefault(require$$3$12)
	  , setToStringTag = interopDefault(require$$3$14)
	  , getPrototypeOf = interopDefault(require$$1$35)
	  , ITERATOR       = interopDefault(require$$0$61)('iterator')
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

	var _iterDefine$3 = interopDefault(_iterDefine$2);


	var require$$0$52 = Object.freeze({
	  default: _iterDefine$3
	});

	var es6_string_iterator$2 = createCommonjsModule(function (module) {
	'use strict';
	var $at  = interopDefault(require$$1$23)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	interopDefault(require$$0$52)(String, 'String', function(iterated){
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

	interopDefault(es6_string_iterator$2);

	var _addToUnscopables$2 = createCommonjsModule(function (module) {
	module.exports = function(){ /* empty */ };
	});

	var _addToUnscopables$3 = interopDefault(_addToUnscopables$2);


	var require$$4$11 = Object.freeze({
		default: _addToUnscopables$3
	});

	var _iterStep$2 = createCommonjsModule(function (module) {
	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};
	});

	var _iterStep$3 = interopDefault(_iterStep$2);


	var require$$3$15 = Object.freeze({
	  default: _iterStep$3
	});

	var es6_array_iterator$2 = createCommonjsModule(function (module) {
	'use strict';
	var addToUnscopables = interopDefault(require$$4$11)
	  , step             = interopDefault(require$$3$15)
	  , Iterators        = interopDefault(require$$1$28)
	  , toIObject        = interopDefault(require$$1$30);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = interopDefault(require$$0$52)(Array, 'Array', function(iterated, kind){
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

	interopDefault(es6_array_iterator$2);

	var web_dom_iterable$2 = createCommonjsModule(function (module) {
	var global        = interopDefault(require$$4$8)
	  , hide          = interopDefault(require$$0$54)
	  , Iterators     = interopDefault(require$$1$28)
	  , TO_STRING_TAG = interopDefault(require$$0$61)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}
	});

	interopDefault(web_dom_iterable$2);

	var _classof$2 = createCommonjsModule(function (module) {
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = interopDefault(require$$0$57)
	  , TAG = interopDefault(require$$0$61)('toStringTag')
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

	var _classof$3 = interopDefault(_classof$2);


	var require$$3$16 = Object.freeze({
	  default: _classof$3
	});

	var _anInstance$2 = createCommonjsModule(function (module) {
	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};
	});

	var _anInstance$3 = interopDefault(_anInstance$2);


	var require$$10$1 = Object.freeze({
	  default: _anInstance$3
	});

	var _iterCall$2 = createCommonjsModule(function (module) {
	// call something on iterator step with safe closing on error
	var anObject = interopDefault(require$$2$12);
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

	var _iterCall$3 = interopDefault(_iterCall$2);


	var require$$4$12 = Object.freeze({
	  default: _iterCall$3
	});

	var _isArrayIter$2 = createCommonjsModule(function (module) {
	// check on default Array iterator
	var Iterators  = interopDefault(require$$1$28)
	  , ITERATOR   = interopDefault(require$$0$61)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};
	});

	var _isArrayIter$3 = interopDefault(_isArrayIter$2);


	var require$$3$17 = Object.freeze({
	  default: _isArrayIter$3
	});

	var core_getIteratorMethod$2 = createCommonjsModule(function (module) {
	var classof   = interopDefault(require$$3$16)
	  , ITERATOR  = interopDefault(require$$0$61)('iterator')
	  , Iterators = interopDefault(require$$1$28);
	module.exports = interopDefault(require$$0$53).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};
	});

	var core_getIteratorMethod$3 = interopDefault(core_getIteratorMethod$2);


	var require$$0$62 = Object.freeze({
	  default: core_getIteratorMethod$3
	});

	var _forOf$2 = createCommonjsModule(function (module) {
	var ctx         = interopDefault(require$$5$4)
	  , call        = interopDefault(require$$4$12)
	  , isArrayIter = interopDefault(require$$3$17)
	  , anObject    = interopDefault(require$$2$12)
	  , toLength    = interopDefault(require$$1$33)
	  , getIterFn   = interopDefault(require$$0$62)
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

	var _forOf$3 = interopDefault(_forOf$2);


	var require$$9 = Object.freeze({
	  default: _forOf$3
	});

	var _speciesConstructor$2 = createCommonjsModule(function (module) {
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = interopDefault(require$$2$12)
	  , aFunction = interopDefault(require$$1$25)
	  , SPECIES   = interopDefault(require$$0$61)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};
	});

	var _speciesConstructor$3 = interopDefault(_speciesConstructor$2);


	var require$$8$2 = Object.freeze({
	  default: _speciesConstructor$3
	});

	var _invoke$2 = createCommonjsModule(function (module) {
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

	var _invoke$3 = interopDefault(_invoke$2);


	var require$$4$13 = Object.freeze({
	  default: _invoke$3
	});

	var _task$2 = createCommonjsModule(function (module) {
	var ctx                = interopDefault(require$$5$4)
	  , invoke             = interopDefault(require$$4$13)
	  , html               = interopDefault(require$$3$13)
	  , cel                = interopDefault(require$$2$14)
	  , global             = interopDefault(require$$4$8)
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
	  if(interopDefault(require$$0$57)(process) == 'process'){
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

	var _task$3 = interopDefault(_task$2);
	var set$3 = _task$2.set;
	var clear$1 = _task$2.clear;

var require$$1$36 = Object.freeze({
	  default: _task$3,
	  set: set$3,
	  clear: clear$1
	});

	var _microtask$2 = createCommonjsModule(function (module) {
	var global    = interopDefault(require$$4$8)
	  , macrotask = interopDefault(require$$1$36).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = interopDefault(require$$0$57)(process) == 'process';

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

	var _microtask$3 = interopDefault(_microtask$2);


	var require$$6$2 = Object.freeze({
	  default: _microtask$3
	});

	var _redefineAll$2 = createCommonjsModule(function (module) {
	var hide = interopDefault(require$$0$54);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};
	});

	var _redefineAll$3 = interopDefault(_redefineAll$2);


	var require$$4$14 = Object.freeze({
	  default: _redefineAll$3
	});

	var _setSpecies$2 = createCommonjsModule(function (module) {
	'use strict';
	var global      = interopDefault(require$$4$8)
	  , core        = interopDefault(require$$0$53)
	  , dP          = interopDefault(require$$0$55)
	  , DESCRIPTORS = interopDefault(require$$1$26)
	  , SPECIES     = interopDefault(require$$0$61)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};
	});

	var _setSpecies$3 = interopDefault(_setSpecies$2);


	var require$$2$18 = Object.freeze({
	  default: _setSpecies$3
	});

	var _iterDetect$2 = createCommonjsModule(function (module) {
	var ITERATOR     = interopDefault(require$$0$61)('iterator')
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

	var _iterDetect$3 = interopDefault(_iterDetect$2);


	var require$$0$63 = Object.freeze({
	  default: _iterDetect$3
	});

	var es6_promise$2 = createCommonjsModule(function (module) {
	'use strict';
	var LIBRARY            = interopDefault(require$$17$1)
	  , global             = interopDefault(require$$4$8)
	  , ctx                = interopDefault(require$$5$4)
	  , classof            = interopDefault(require$$3$16)
	  , $export            = interopDefault(require$$1$24)
	  , isObject           = interopDefault(require$$12$1)
	  , aFunction          = interopDefault(require$$1$25)
	  , anInstance         = interopDefault(require$$10$1)
	  , forOf              = interopDefault(require$$9)
	  , speciesConstructor = interopDefault(require$$8$2)
	  , task               = interopDefault(require$$1$36).set
	  , microtask          = interopDefault(require$$6$2)()
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
	      , FakePromise = (promise.constructor = {})[interopDefault(require$$0$61)('species')] = function(exec){ exec(empty, empty); };
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
	  Internal.prototype = interopDefault(require$$4$14)($Promise.prototype, {
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
	interopDefault(require$$3$14)($Promise, PROMISE);
	interopDefault(require$$2$18)(PROMISE);
	Wrapper = interopDefault(require$$0$53)[PROMISE];

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
	$export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$0$63)(function(iter){
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

	interopDefault(es6_promise$2);

	var promise$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$53).Promise;
	});

	var promise$3 = interopDefault(promise$2);


	var require$$0$49 = Object.freeze({
		default: promise$3
	});

	var promise = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$49), __esModule: true };
	});

	var promise$1 = interopDefault(promise);


	var require$$0$48 = Object.freeze({
		default: promise$1
	});

	var asyncToGenerator = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _promise = interopDefault(require$$0$48);

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
	  return !(obj === undefined || obj === null || obj === '');
	}

	function noop() {}

	function getObjectOverride(context, prop) {
	  if (!context) {
	    return false;
	  }

	  return isFunction(context[prop]) ? context[prop] : getObjectOverride(context.__proto__, prop);
	}

	var formatMessage = function () {
	  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
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

	var es6_object_defineProperty$2 = createCommonjsModule(function (module) {
	var $export = interopDefault(require$$1$24);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !interopDefault(require$$1$26), 'Object', {defineProperty: interopDefault(require$$0$55).f});
	});

	interopDefault(es6_object_defineProperty$2);

	var defineProperty$1 = createCommonjsModule(function (module) {
	var $Object = interopDefault(require$$0$53).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};
	});

	var defineProperty$2 = interopDefault(defineProperty$1);


	var require$$0$64 = Object.freeze({
	  default: defineProperty$2
	});

	var defineProperty = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$64), __esModule: true };
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

	function getRule(name) {
	  return rulesHolder[name] || {};
	}

	var _objectSap$2 = createCommonjsModule(function (module) {
	// most Object methods by ES6 should accept primitives
	var $export = interopDefault(require$$1$24)
	  , core    = interopDefault(require$$0$53)
	  , fails   = interopDefault(require$$0$56);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};
	});

	var _objectSap$3 = interopDefault(_objectSap$2);


	var require$$0$66 = Object.freeze({
	  default: _objectSap$3
	});

	var es6_object_keys$2 = createCommonjsModule(function (module) {
	// 19.1.2.14 Object.keys(O)
	var toObject = interopDefault(require$$2$17)
	  , $keys    = interopDefault(require$$5$5);

	interopDefault(require$$0$66)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});
	});

	interopDefault(es6_object_keys$2);

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$53).Object.keys;
	});

	var keys$3 = interopDefault(keys$2);


	var require$$0$65 = Object.freeze({
		default: keys$3
	});

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$65), __esModule: true };
	});

	var _Object$keys = interopDefault(keys$1);

	var _objectGops$2 = createCommonjsModule(function (module, exports) {
	exports.f = Object.getOwnPropertySymbols;
	});

	var _objectGops$3 = interopDefault(_objectGops$2);
	var f$8 = _objectGops$2.f;

var require$$4$15 = Object.freeze({
		default: _objectGops$3,
		f: f$8
	});

	var _objectPie$2 = createCommonjsModule(function (module, exports) {
	exports.f = {}.propertyIsEnumerable;
	});

	var _objectPie$3 = interopDefault(_objectPie$2);
	var f$9 = _objectPie$2.f;

var require$$3$18 = Object.freeze({
		default: _objectPie$3,
		f: f$9
	});

	var _objectAssign$2 = createCommonjsModule(function (module) {
	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = interopDefault(require$$5$5)
	  , gOPS     = interopDefault(require$$4$15)
	  , pIE      = interopDefault(require$$3$18)
	  , toObject = interopDefault(require$$2$17)
	  , IObject  = interopDefault(require$$1$31)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || interopDefault(require$$0$56)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;
	});

	var _objectAssign$3 = interopDefault(_objectAssign$2);


	var require$$0$69 = Object.freeze({
	  default: _objectAssign$3
	});

	var es6_object_assign$2 = createCommonjsModule(function (module) {
	// 19.1.3.1 Object.assign(target, source)
	var $export = interopDefault(require$$1$24);

	$export($export.S + $export.F, 'Object', {assign: interopDefault(require$$0$69)});
	});

	interopDefault(es6_object_assign$2);

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = interopDefault(require$$0$53).Object.assign;
	});

	var assign$3 = interopDefault(assign$2);


	var require$$0$68 = Object.freeze({
		default: assign$3
	});

	var assign = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$68), __esModule: true };
	});

	var assign$1 = interopDefault(assign);


	var require$$0$67 = Object.freeze({
		default: assign$1
	});

	var _extends = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _assign = interopDefault(require$$0$67);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
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
	});

	var _extends$1 = interopDefault(_extends);

	var classCallCheck = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = interopDefault(classCallCheck);

	var validateRule = function () {
	  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(rule, expected, value, message, rules, messages, property, obj, schema) {
	    var _getRule, defaultRule, defaultMessage, overriddenRule, overriddenMessage, isValid;

	    return _regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _getRule = getRule(rule);
	            defaultRule = _getRule.check;
	            defaultMessage = _getRule.message;
	            overriddenRule = rules && (getObjectOverride(rules, rule) || rules[rule]);
	            overriddenMessage = messages && (getObjectOverride(messages, rule) || messages[rule]);
	            _context.next = 7;
	            return (isFunction(overriddenRule) ? overriddenRule : defaultRule || noop)(value, expected, property, obj, schema, defaultRule);

	          case 7:
	            isValid = _context.sent;

	            if (!(isValid !== true)) {
	              _context.next = 12;
	              break;
	            }

	            _context.next = 11;
	            return formatMessage(overriddenMessage || message || defaultMessage, value, expected, property, obj, rule);

	          case 11:
	            return _context.abrupt('return', _context.sent);

	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function validateRule(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var validateValue = function () {
	  var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(value) {
	    var rules = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var messages = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var property = arguments[3];
	    var obj = arguments[4];
	    var schema = arguments[5];
	    var errors, rule, expected, message, result;
	    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            errors = {};
	            _context2.t0 = _regeneratorRuntime.keys(rules);

	          case 2:
	            if ((_context2.t1 = _context2.t0()).done) {
	              _context2.next = 13;
	              break;
	            }

	            rule = _context2.t1.value;

	            if (!rules.hasOwnProperty(rule)) {
	              _context2.next = 11;
	              break;
	            }

	            expected = rules[rule];
	            message = messages[rule];
	            _context2.next = 9;
	            return validateRule(rule, expected, value, message, rules, messages, property, obj, schema);

	          case 9:
	            result = _context2.sent;


	            if (result) {
	              errors[rule] = result;
	            }

	          case 11:
	            _context2.next = 2;
	            break;

	          case 13:
	            return _context2.abrupt('return', new ValidationResult(errors));

	          case 14:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function validateValue(_x10, _x11, _x12, _x13, _x14, _x15) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var validateProperty = function () {
	  var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(property, obj) {
	    var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var rules = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var messages = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

	    var _properties$property, _properties$property$, propertyRules, _properties$property$2, propertyMessages, propertyProperties, value, valueValidationResult, errors, arrayValidationResult, objectValidationResult;

	    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _properties$property = properties[property];
	            _properties$property$ = _properties$property.rules;
	            propertyRules = _properties$property$ === undefined ? {} : _properties$property$;
	            _properties$property$2 = _properties$property.messages;
	            propertyMessages = _properties$property$2 === undefined ? {} : _properties$property$2;
	            propertyProperties = _properties$property.properties;


	            propertyRules.__proto__ = rules;
	            propertyMessages.__proto__ = messages;

	            value = obj[property];
	            _context3.next = 11;
	            return validateValue(value, propertyRules, propertyMessages, property, obj, properties);

	          case 11:
	            valueValidationResult = _context3.sent;
	            errors = valueValidationResult.getErrors();

	            if (!propertyProperties) {
	              _context3.next = 26;
	              break;
	            }

	            if (!isArray(value)) {
	              _context3.next = 21;
	              break;
	            }

	            _context3.next = 17;
	            return validateArray(value, propertyProperties, rules, messages);

	          case 17:
	            arrayValidationResult = _context3.sent;


	            errors.__proto__ = arrayValidationResult.getErrors();
	            _context3.next = 26;
	            break;

	          case 21:
	            if (!isObject(value)) {
	              _context3.next = 26;
	              break;
	            }

	            _context3.next = 24;
	            return validateObject(value, propertyProperties, rules, messages);

	          case 24:
	            objectValidationResult = _context3.sent;


	            errors.__proto__ = objectValidationResult.getErrors();

	          case 26:
	            return _context3.abrupt('return', new ValidationResult(errors));

	          case 27:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function validateProperty(_x18, _x19, _x20, _x21, _x22) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	var validateArray = function () {
	  var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(array, properties) {
	    var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var messages = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var errors, ln, i;
	    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            errors = {};
	            ln = array.length;
	            i = 0;

	          case 3:
	            if (!(i < ln)) {
	              _context4.next = 10;
	              break;
	            }

	            _context4.next = 6;
	            return validateObject(array[i], properties, rules, messages);

	          case 6:
	            errors[i] = _context4.sent;

	          case 7:
	            i++;
	            _context4.next = 3;
	            break;

	          case 10:
	            return _context4.abrupt('return', new ValidationResult(errors));

	          case 11:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function validateArray(_x26, _x27, _x28, _x29) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	var validateObject = function () {
	  var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(obj, properties) {
	    var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var messages = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var errors, property;
	    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            errors = {};
	            _context5.t0 = _regeneratorRuntime.keys(properties);

	          case 2:
	            if ((_context5.t1 = _context5.t0()).done) {
	              _context5.next = 10;
	              break;
	            }

	            property = _context5.t1.value;

	            if (!properties.hasOwnProperty(property)) {
	              _context5.next = 8;
	              break;
	            }

	            _context5.next = 7;
	            return validateProperty(property, obj, properties, rules, messages);

	          case 7:
	            errors[property] = _context5.sent;

	          case 8:
	            _context5.next = 2;
	            break;

	          case 10:
	            return _context5.abrupt('return', new ValidationResult(errors));

	          case 11:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));

	  return function validateObject(_x32, _x33, _x34, _x35) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	var validate = function () {
	  var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6(schema, obj) {
	    var rules, messages, properties;
	    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            rules = schema.rules;
	            messages = schema.messages;
	            properties = schema.properties;
	            _context6.next = 5;
	            return validateObject(obj, properties || schema, rules, messages);

	          case 5:
	            return _context6.abrupt('return', _context6.sent);

	          case 6:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));

	  return function validate(_x38, _x39) {
	    return _ref6.apply(this, arguments);
	  };
	}();

	var ValidationResult = function ValidationResult(errors) {
	  _classCallCheck(this, ValidationResult);

	  return _extends$1({}, this, errors, errors.__proto__, {
	    isValid: function isValid() {
	      return !this.hasErrors();
	    },
	    hasErrors: function hasErrors() {
	      return _Object$keys(errors).some(function (key) {
	        if (errors[key]) {
	          return true;
	        }

	        if (errors[key].hasErrors) {
	          return errors[key].hasErrors();
	        }

	        return false;
	      });
	    },
	    hasErrorsOfTypes: function hasErrorsOfTypes() {
	      for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
	        types[_key] = arguments[_key];
	      }

	      return _Object$keys(errors).some(function (key) {
	        if (types.includes(key)) {
	          return true;
	        }

	        if (errors[key].hasErrorsOfTypes) {
	          var _errors$key;

	          return (_errors$key = errors[key]).hasErrorsOfTypes.apply(_errors$key, types);
	        }

	        return false;
	      });
	    },
	    getErrors: function getErrors() {
	      return _extends$1({}, errors);
	    },
	    getErrorsAsArray: function getErrorsAsArray() {
	      for (var _len2 = arguments.length, exclude = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        exclude[_key2] = arguments[_key2];
	      }

	      return _Object$keys(errors).filter(function (key) {
	        return !exclude.includes(key);
	      }).map(function (key) {
	        return errors[key];
	      });
	    },
	    getFirstError: function getFirstError() {
	      for (var _len3 = arguments.length, exclude = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        exclude[_key3] = arguments[_key3];
	      }

	      return this.getErrorsAsArray(exclude)[0];
	    }
	  });
	};

	var ValidationSchema = function ValidationSchema(schema) {
	  _classCallCheck(this, ValidationSchema);

	  this.validate = validate.bind(this, schema);
	};

	function divisibleByRule(value, divisibleBy) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  var multiplier = Math.max((value - Math.floor(value)).toString().length - 2, (divisibleBy - Math.floor(divisibleBy)).toString().length - 2);

	  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

	  return value * multiplier % (divisibleBy * multiplier) === 0;
	}

	registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');

	function enumRule(value, e) {
	  if (!isDefined(value)) {
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

	function formatRule(value, format) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  if (!FORMATS[format]) {
	    throw new Error('Unknown format "' + format + '"');
	  }

	  return FORMATS[format].test(value);
	}

	registerRule('format', formatRule, 'is not a valid %{expected}');

	function maxRule(value, max) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value <= max;
	}

	registerRule('max', maxRule, 'must be less than or equal to %{expected}');

	function maxItemsRule(value, minItems) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return isArray(value) && value.length <= minItems;
	}

	registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');

	function maxLengthRule(value, maxLength) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value.length <= maxLength;
	}

	registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');

	function exclusiveMaxRule(value, exclusiveMax) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value < exclusiveMax;
	}

	registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');

	function minRule(value, min) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value >= min;
	}

	registerRule('min', minRule, 'must be greater than or equal to %{expected}');

	function minItemsRule(value, minItems) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return isArray(value) && value.length >= minItems;
	}

	registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');

	function minLengthRule(value, minLength) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value.length >= minLength;
	}

	registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');

	function exclusiveMinRule(value, exclusiveMin) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  return value > exclusiveMin;
	}

	registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');

	function patternRule(value, pattern) {
	  if (!isDefined(value)) {
	    return true;
	  }

	  pattern = isString(pattern) ? new RegExp(pattern) : pattern;

	  return pattern.test(value);
	}

	registerRule('pattern', patternRule, 'invalid input');

	function requiredRule(value, required) {
	  if (value) {
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

	function typeRule(value, type) {
	  if (!isDefined(value)) {
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
	var core  = interopDefault(require$$0$53)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};
	});

	var stringify$2 = interopDefault(stringify$1);


	var require$$0$70 = Object.freeze({
	  default: stringify$2
	});

	var stringify = createCommonjsModule(function (module) {
	module.exports = { "default": interopDefault(require$$0$70), __esModule: true };
	});

	var _JSON$stringify = interopDefault(stringify);

	function uniqueItemsRule(value, uniqueItems) {
	  if (!isDefined(value)) {
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

	exports.isType = isType;
	exports.isObject = isObject;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.isString = isString;
	exports.isDate = isDate;
	exports.isNumber = isNumber;
	exports.isBoolean = isBoolean;
	exports.isDefined = isDefined;
	exports.noop = noop;
	exports.getObjectOverride = getObjectOverride;
	exports.formatMessage = formatMessage;
	exports.registerRule = registerRule;
	exports.hasRule = hasRule;
	exports.getRule = getRule;
	exports.validateRule = validateRule;
	exports.validateValue = validateValue;
	exports.validateProperty = validateProperty;
	exports.validateArray = validateArray;
	exports.validateObject = validateObject;
	exports.validate = validate;
	exports.ValidationResult = ValidationResult;
	exports.ValidationSchema = ValidationSchema;
	exports.divisibleByRule = divisibleByRule;
	exports.enumRule = enumRule;
	exports.formatRule = formatRule;
	exports.maxRule = maxRule;
	exports.maxItemsRule = maxItemsRule;
	exports.maxLengthRule = maxLengthRule;
	exports.exclusiveMaxRule = exclusiveMaxRule;
	exports.minRule = minRule;
	exports.minItemsRule = minItemsRule;
	exports.minLengthRule = minLengthRule;
	exports.exclusiveMinRule = exclusiveMinRule;
	exports.patternRule = patternRule;
	exports.requiredRule = requiredRule;
	exports.typeRule = typeRule;
	exports.uniqueItemsRule = uniqueItemsRule;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=valirator.js.map
