var is = require('dis')

var variable = function(name,variable){
	if(is.number(name)){name='var_'+name;}
	return name+'='+JSON.stringify(variable)+';';
}

var inline = function(vars){
	var str = '<script type="text/javascript">';
	for(var n in vars){
		str+=variable(n,vars[n]);
	}
	str+='</script>';
	return str;
}

inline.variable = variable;

module.exports = inline;