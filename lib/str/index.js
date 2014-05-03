var S = require('string');
var proto = Object.getPrototypeOf(S());
var extend = require('node.extend');
var toArgs = function(args){return Array.prototype.slice.call(args);};
var Wrapper = {};
var list = [];

var wrap = function(funcName){
	return function(val){
		var args = toArgs(arguments);
		val = args.shift();
		var s = S(val);
		//console.log('args for '+funcName,args)
		var ret = s[funcName].apply(s,args).s;
		//var ret = s.repeat.apply(s,[2]).s;
		//console.log('answer',ret);
		return ret;
	};
};

for(var n in proto){
	Wrapper[n] = wrap(n);
	list.push(n);
};

Wrapper.truncateHTML = function(val, truncateLength, truncateBy, suffix, stripHTML, strict){
	var opts = {
		TruncateLength: truncateLength || 4 
	,	TruncateBy : truncateBy || 'words' 
	,	Strict : strict || true
	,	StripHTML : stripHTML || false
	,	Suffix : suffix || ''
	};
	return require('truncatise')(val,opts);
}

list.push('truncateHTML');

Wrapper._list = list;
module.exports = Wrapper;