var moment = require('moment');
var proto = Object.getPrototypeOf(moment());
var toArgs = function(args){return Array.prototype.slice.call(args);};
var Wrapper = {};
var list = [];

var wrap = function(funcName){
	return function(val){
		var args = toArgs(arguments);
		val = args.shift();
		var m = moment(val);
		return m[funcName].apply(m,args);
	};
};

for(var n in proto){
	Wrapper[n] = wrap(n);
	list.push(n);
}

Wrapper._list = list;
module.exports = Wrapper;