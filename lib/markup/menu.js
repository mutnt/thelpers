var createMenu = function(markup){

	var items = {};
	markup = markup || '<span class="menuItem"><a href="{{url}}" title="{{name}}">{{name}}</a>{{nested}}</span>';

	var menuItem = function(name,url){

		var origName = name;

		if(!url || url == '#'){
			url = name.replace(/\s/,'-');
			name = false;
		}

		if(!name){
			name = url
				.replace(/-/g, ' ')
				.replace(/#/g, '')
				.replace(/(\s|^)(\w)/g,function(m,s,l){return s+l.toUpperCase();})
			;
		}

		id = url.replace(/^(#|http:\/\/)/,'').replace(/\/|\s|\./g,'-');

		return {
			name:name
		,	url: url
		,	origName: origName
		,	id: id
		,	nested:{}
		,	length:0
		,	add:function(id,item){
				this.nested[id] = item;
				this.length++;
				return id;
			}
		,	toString:function(){
				var nested = '';
				for(var n in this.nested){
					nested+=this.nested[n].toString();
				}
				return markup
					.replace(/\{\{url\}\}/ig,this.url)
					.replace(/\{\{name\}\}/ig,this.name)
					.replace(/\{\{id\}\}/ig,this.id)
					.replace(/\{\{nested\}\}/ig,nested)
				;
			}
		};
	};

	var menu = function(name,url,nest){
		if(name){
			var m = menuItem(name,url);
			var id = m.origName;
			if(!nest){items[id] = m;}
			else{
				items[nest].add(id,m);
			}
			return id;
		}
		else{
			return render();
		}
	};

	var render = function(){
		var str = '';
		for(var n in items){
			str+=items[n].toString();
		}
		str+='';
		return str;
	};

	menu.items = items;
	menu.toString = render();

	return menu;

};

module.exports = createMenu;