var funcs = {}
var list = [];

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
	if(file.match(/.+\.js/g) !== null && file !== 'index.js') {
		var name = file.replace('.js', '');
		funcs[name] = require('./' + file)
		list.push(name);
	}
});

funcs._list = list;
module.exports = funcs;