var init = function(obj,num,length,prefix,property,makeToString){
	prefix = prefix || 'item-';
	property = property || 'loop_pos';
	var print = function(append){
		return [
			print.prefix+print.number
		,	print.prefix+print.rank
		,	print.prefix+print.parity
		].join(' ')+(append?' '+append:'');
	};
	var calculate = function(num,length){
		print.rank =  (num === 0 ? 'first' : (num == length -1 ? 'last' : 'middle' ));
		print.number = (num+1);
		print.parity = ((num+1) % 2 ? 'odd':'even');
		print.__num = num;
		print.__length = length;
	};
	var setNum = function(num){
		calculate(num,print.__length);
	};
	var setLength = function(length){
		calculate(print.__num,length);
	};
	print.prefix =  prefix;
	print.__defineGetter__('num',function(){return print.__num;});
	print.__defineSetter__('num',setNum);
	print.__defineGetter__('length',function(){return print.__length;});
	print.__defineSetter__('length',setLength);
	print.__length = length;
	print.__num = num;
	setNum(num);
	Object.defineProperty(obj,property,{
		enumerable: false
	,	writable: true
	});
	obj[property] = print;
	if(makeToString){
		obj.toString = function(){
			return obj[property]();
		}
	}
	return obj;
};

var Loop = function(obj,num,length,prefix,propertyName,makeToString){
	if((this instanceof Loop)){
		prefix = length;
		length = num;
		num = obj;
		obj = this;
		propertyName = 'pos';
	}else if(Array.isArray(obj)){
		makeToString = prefix;
		propertyName = length;
		prefix = num;
		var l = obj.length;
		for(var i=0; i < l; i++){
			Loop(obj[i],i,l,prefix,propertyName,makeToString);
		}
		return obj;
	}
	return init(obj,num,length,prefix,propertyName,makeToString);
};

Loop.init = init;
Loop.prototype = {
	constructor: Loop
,	toString:function(){
		return this.pos();
	}
};