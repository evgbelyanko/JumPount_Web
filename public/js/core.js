var myDeviceOS = null;

if(document.documentElement.clientWidth<=768){
	var myDevice = 'mobile';
} else {
	var myDevice = 'desktop';
}

function text(data){
	return document.createTextNode(data);
}

function selector(el){
	return document.querySelector(el);
}

function selectorAll(el){
	return document.querySelectorAll(el);
}

function html(el, html){
	selector(el).innerHTML += ' ' + html;
}

function remove(el){
	if(Array.isArray(el) == false){
		var arr = [];
		arr.push(el);
	} else{
		arr = el;
	}
	arr.forEach(function(el) {
		return el.parentNode.removeChild(el);
	});
}

function next(el) {
	return el.nextElementSibling;
};

function nextAll(el) {
	var next = false;
	return [].filter.call(el.parentNode.children, function(child) {
		if (child === el) next = true;
		return next && child !== el
	})
}

function insertAfter(el, html) {
	return selector(el).insertAdjacentHTML('afterEnd', html);
}

function getCSS(el){
	return getComputedStyle(el);
}

function pageScrollBottom(el){
	selector(el).scrollTop = selector(el).scrollHeight;
}

function varGuard(str, decode = null){
	if(decode === 'decode'){
		str = decodeURIComponent(escape(window.atob(str)));
	}

	str = str.replace(/\\n/g,' ');
	str = str.replace(/^\s+|\s+$/g,'');

	return str;
}

var get = (function() {
	let a = window.location.search;
	let b = new Object();
	a = a.substring(1).split("&");
	for (let i = 0; i < a.length; i++) {
		c = a[i].split("=");
		b[c[0]] = c[1];
	}
	return b;
})();

function includeCSS(href = null, text = null, endPoint = 'body'){
	style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = href;
	selector(endPoint).appendChild(style);
}

function includeJS(src = null, text = null, endPoint = 'body'){
	script = document.createElement('script');
	script.type = 'text/javascript';
	if(src != null){
		script.src = src;
	}
	if(text != null){
		script.text = text;
	}

	if(endPoint == '.content'){
		insertAfter(script, selector(endPoint));
	} else {
		selector(endPoint).appendChild(script);
	}
}

function removeChildJS(countJS){
	let l = 1;
	for(let i = 0; i < countJS; i++){
	 let bodyChilds = document.body.children; // Получаем всех потомков у тега боди
	 let bodyChildLen = bodyChilds.length-l; // Получаем количество потомков у тега боди
	 if(bodyChilds[bodyChildLen].tagName == 'SCRIPT'){
	 	remove(bodyChilds[bodyChildLen]);
	 } else {
	 	l++;
	 	countJS++;
	 }
	}
	countJS = 0;
}

function nextRemoveJS(){
	let arrayElements = nextAll(selector('.nav_panel'));
	for(let i = 0; i < arrEls.length; i++){
		remove(arrayElements[i]);
	}
}

function checkContent(){
	if(!selector('.content')){
		let content = document.createElement('div');
		content.className = 'content';
		selector('body').appendChild(content);
	}
}

function escapeSpecialChars(JSON) {
	return JSON
		.replace('/\n/g', "\\n")
		.replace('/\r/g', "\\r")
		.replace('/\t/g', "\\t")
		.replace('/\f/g', "\\f");
}

function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function lazyLoadImage(){
	[].forEach.call(selectorAll('img[data-src]'), function(img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
			img.removeAttribute('data-src');
		};
	});
};