

var libsLength = libs.length;
var list = [].concat(libs[0].proto,libs[1].proto);

var run = function(value,command,args){
	for(var i = 0; i < libsLength; i++){
		if(libs[i].proto.indexOf(command)>=0){
			for(var u = 0; u < args.length; u++){
				args[u] = is.numeric(args[u]) ? S(args[u]).toFloat() : args[u];
			}
			return libs[i].handler(value,command,args);
		}
	}
	return value;
}

var parse = function(args){
	args = commands.replace(/\s?>\s?/g,'>').split('>');
	var val = args.shift()
	,	l = args.length
	for(var i=0;i<l;i++){
		args[i] = args[i].split(/ /g);
		var command = args[i].shift();
		console.log(command,args)
		val = run(val,command.toLowerCase(),args[i]);
	}
	return val;
}

parse.list = list;

module.exports = parse;
module.m = moment;
module.s = S;

var a = parse('2014-10-31 > repeat 2 > dasherize > right 10');

console.log(a);