var ids = {}

var id = function(str,box){
	str = str || '';
	box = box || '_global';
	if(!ids[box]){ids[box] = [];}
	var repo = ids[box]
	var n = 1;
	var id = str ?  str+n : n;
	while(repo.indexOf(id)>=0){
		id = str+nextId.delimiter+(++n);
	}
	repo.push(id);
}

id.ids = ids;
id.delimiter = '';
module.exports = id;