# THELPERS

Set of template helpers

Thelpers is a set of template helpers.
Commands are chained as such:

```js
var th = require('thelpers');
var a = th('2014-10-31 > repeat 2 > dasherize > right 10 > subtract 3 days > calendar');
console.log(a)
```

To get a list of functions, use 
```js
console.log(th.list)
```

Apart from using the chain, you can use the different functions directly.
Each set of functions lives on it's own letter, d,j,m or s.

See below.

---

## String Utils

All the functions found at [stringjs](http://stringjs.com), with the added:

### s.truncateHTML

```js
s.truncateHTML(val, truncateLength, truncateBy, suffix, stripHTML, strict)
```
uses [truncatise](https://github.com/AverageMarcus/Truncatise)

all the functions live on the 's' namespace
same functions signatures as string, but specify the value as the first argument.

So for example the original example
```js
S('data_rate').camelize().s
```

becomes:
```js
s.camelize('data_rate')
```


---

## Date utils

uses [moment](http://momentjs.com/) and lives on the 'm' namespace

use the same functions signatures as moment, but specify the value as the first argument.

So for example the example
```js
moment('2012-12-31').add(20,'days')
```

is used like so:
```js
m.add('2012-12-31',20,'days')
```

---

## Inline Javascript utils

```js
j.inline(some_js_variables)
```
It will add automatically script tags and descend in objects;
or, to output only one variable:
```js
j.inline.variable(name,variable)
```

---

## Markup Utils

---

### m.id

simple counter for generating unique IDs

```js
m.id('page'); //returns page1
m.id('page'); //returns page2
m.id('page'); //returne page3
m.id('page','otherContext'); //returns page1
m.id('page','otherContext'); //returns page2
m.id() //returns 1
console.log(m.id.ids);
/**
{
	_global: [ 'page1', 'page2', 'page3', 1 ],
	otherContext: [ 'page11', 'page21' ]
}
**/
```

---


### m.loop

Adds classes for looping templates:

```js
var a = new m.loop(0,5);//number, total
var b = new m.loop(1,5,'item-'); //'item-' is the default prefix
var c = {};
m.loop(c,2,5,'object_'); //adds the loop helper to the object
var d = {}
m.loop(d,3,5,'object_','__loop'); //specifies the function name to add to the item, it is 'loop_pos' by default 
var e = {}
m.loop(e,4,5,'object_','__loop',true); //this will make the "toString" function default to __loop

for(var n in c){
	console.log(c[n]); //nothing shows, the added function is not enumerable
}

console.log(
	'A: ['+a+']\n' // notice no need to call pos() or loop_pos() or any function on native loop objects as their toString function uses pos() internally
+	'B: ['+b.pos('some added thingy')+']\n' //but you can append by explicitely calling the function
+	'C: ['+c.loop_pos()+']\n'
+	'D: ['+d.__loop()+']\n'
+	'E: ['+e+']\n' //we passed true as a last argument, so toString works here too
);
/** Returns:
A: [item-1 item-first item-odd]
B: [item-2 item-middle item-even some added thingy]
C: [object_3 object_middle object_odd]
D: [object_4 object_last object_even]
**/

var menuItems = [{text:'a'},{text:'b'},{text:'c'},{text:'d'}];
m.loop(menuItems,'mItem-','_p',false)
for(n in menuItems){
	console.log('<li class="'+menuItems[n]._p()+'">'+menuItems[n].text+'</li>');
}
/** Returns:
<li class="mItem-1 mItem-first mItem-odd">a</li>
<li class="mItem-2 mItem-middle mItem-even">b</li>
<li class="mItem-3 mItem-middle mItem-odd">c</li>
<li class="mItem-4 mItem-last mItem-even">d</li>
**/
```

---

### m.createMenu

```js
var menu = m.createMenu();

menu('#home');
menu('#galleries');
menu('Social Media','#')
menu('twitter','http://www.twitter.com/something','Social Media')
menu('facebook','http://www.facebook.com/something','Social Media')
menu('#contact-us');

console.log(menu()); //call menu() without arguments to print
/** Returns (indentation added by me):
<span class="menuItem"><a href="#home" title="Home">Home</a></span>
<span class="menuItem"><a href="#galleries" title="Galleries">Galleries</a></span>
<span class="menuItem"><a href="Social-Media" title="Social Media">Social Media</a>
	<span class="menuItem"><a href="http://www.twitter.com/something" title="twitter">twitter</a></span>
	<span class="menuItem"><a href="http://www.facebook.com/something" title="facebook">facebook</a></span>
</span>
<span class="menuItem"><a href="#contact-us" title="Contact Us">Contact Us</a></span>
**/
```

You can specify the markup:

```js
var menu = m.createMenu('<div data-link="{{url}}">{{name}}{{nested}}</div>')

menu('my home')
menu('somewhere','/some-page.html')
menu('lalala')
menu('lilili','#lilili','lalala')

console.log(menu())
/** Returns
<div data-link="my-home">My Home</div>
<div data-link="/some-page.html">Somewhere</div>
<div data-link="lalala">Lalala
	<div data-link="#lilili">lilili</div>
</div>
**/
```

---

