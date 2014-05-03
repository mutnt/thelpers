var is = require('dis');
var libs = {}
var list = [];

var parse = function(commands){
	commands = commands.replace(/\s?>\s?/g,'>').split('>');
	var value = commands.shift()
	,	l = commands.length
	,	args
	,	command
	;
	for(var i=0;i<l;i++){
		args = commands[i].split(/ /g);
		var command = args.shift();
		value = run(value,command.toLowerCase(),args);
	}
	return value;
}

var run = function(value,command,args){
	for(var n in libs){
		var module = libs[n];
		if(module._list.indexOf(command)>=0){
			for(var u = 0; u < args.length; u++){
				args[u] = is.numeric(args[u]) ? parseFloat(args[u]) : args[u];
			}
			//console.log(module._name, value,command,args)
			args.unshift(value);
			value = module[command].apply(null,args);
			//console.log(value)
			//console.log('-------')
			return value;
		}
	}
	return value;
}

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
	if(file !== 'index.js'){
		var letter = file[0];
		var module = require('./' + file)
		libs[letter] = module;
		parse[letter] = module;
		module._name = file;
		list = list.concat(module._list);
	}
});

parse.list = list;

module.exports = parse;