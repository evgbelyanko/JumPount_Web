function pageError(){	
	window.stop();
	document.execCommand("Stop", false);
	window.location.replace('/error.php');
}
/**
 * Функция с основными действиями подгрузкой и удалением HTML
 *
 * @param {string} urlHTML. Ссылка на HTML шаблон страницы.
 * @param {string} elHTML. Элемент в который экспортируется HTML код.
 * @param {object} objIncludeJS. Содержит список ссылок на JS-сценарии.
 * @param {boolean} removeScriptsAndContent.
 * При true удаляет старый контент и подключенные за ним скрипты.
 */
function loadPage(pagePath = null, pageArgs = null){
	if(window.location.pathname != '/'){
		pagePath = (pagePath == null) ? window.location.pathname : pagePath;
		pageArgs = (pageArgs == null) ? window.location.search : pageArgs;
	} else {
		pagePath = '/feed';
		pageArgs = '';
	}
	
/*	ajax.get('/app'+pagePath+'/template.php',{
		onDone:function(pageTemplate){
			window.pageTemplate = pageTemplate;

			ajax.get('/dev'+pagePath+'/data.json.php'+pageArgs,{
				onDone:function(json){
					includeJS(null, json);
					includeJS('/app'+pagePath+'/script.js');
					pagePreload('stop');
				}
			});
		}
	});*/
}
//loadPage();



function pageConf(pageObj){
	pageObj.state = window.location.pathname+window.location.search;
	// При отсутствии страницы обозначить страницу ошибочной

	// Установка URL адреса
	// replaceState
	// pushState
	// {url: pageObj.url}
	history.pushState({url: pageObj.url}, 0, pageObj.url);

	// Меняет цвет ссылки в навигации (если она там присутствует)
	if(pageObj.navColor == true){
		navColor(pageObj.name);
	}

	window.page = pageObj;
}



// ссылка
function link(pagePath, removeElements = true){
	pagePreload('start');
	var content = selector('.content');
	// Остановка таймера Google Maps 
	clearTimeout(app.map_refresh);

	countJS = (typeof countJS !== 'undefined') ? countJS : 2;
	back_page = page.name;

	if(myDevice == 'mobile') removeElements = true;

	if(removeElements == true){
		var arrayElements = nextAll(selector('.nav_panel'));
		for(var i = 0; i < arrayElements.length; i++){
			remove(arrayElements[i]);
		}
	}

	loadPage(
		parseUrl(pagePath).pathname, // Имя страницы
		parseUrl(pagePath).search // Аргументы для страницы
	);
}

// обработчик нажатий на кнопки браузера назад/вперед 
window.onpopstate = function(event){
	if(page.wrap == true){
		removeWrapLayer(1, false);
	} else {
		link(page.state);
	}
};

/**
 * Создание затемненного слоя
 *
 * @param {string} width. Ширина окна контента wrap
 * @param {boolean} ellipsis. Определяет запущен ли ellipsis
 */
function wrapLayer(width = '600px', ellipsis = false){
	let wrap = selectorAll('.wrap');
	// ID нового wrap всегда равен их количеству
	wrap_id = wrap.length;

	if(myDevice == 'mobile'){
		width = '100%';
	}
	// CSS слой для каждого wrap зависит от его ID
	let zIndex = 800;
	let zIndexWrap = zIndex + wrap_id;
	let zIndexWrapWindow = zIndexWrap + 1;
	// HTML контента wrap
	selector('.content').insertAdjacentHTML("beforeEnd", `
		<div id="wrap_`+wrap_id+`" class="wrap">
			<div class="wrap_back" style="z-index: `+zIndexWrap+`;" onclick="removeWrapLayer(1, `+ellipsis+`);">
				<div class="fa fa-close wrap_close"></div>
			</div>
			<div class="wrap_window" style="width: `+width+`;z-index: `+zIndexWrapWindow+`;"></div>
		</div>
	`);
}

/**
 * Удаление слоя wrap.
 *
 * @param {integer} wrapDeleteCount. Количество wrap для удаления.
 * @param {boolean} reverse. Последовательность удаления.
 * 	Значение true удалияет с конца.
 * 	Значение false удалияет с начала.
 * @param {boolean} ellipsis. Определяет запущен ли ellipsis.
 */
function removeWrapLayer(wrapDeleteCount = 0, ellipsis = false, reverse = true){
	if(selector('.wrap')){
		// Проверка на существование фоновой страницы
		if(typeof countJS !== 'undefined'){
			// Проверка на запуск ellipsis
			if(ellipsis == false){
				if(typeof back_page !== 'undefined'){
					page.name = back_page;
					back_page = null;
				}
					// Возвращяет адрес ссылки на предыдущую страницу
					window.history.back();
					// Удаление подключенных скриптов с конца
					removeChildJS(countJS);
					countJS = null;
			}
		}
		// Удаление всех wrap при all
		if(wrapDeleteCount == 'all'){
			wrapDeleteCount = wrap_id;
		}
		// Удаление последнего wrap
		if(reverse == true){
			let l = 1;
			for(let i = 0; i < wrapDeleteCount; i++){
				let contentChilds = selector('.content').children;
				let contentChilds_Length = contentChilds.length-l;
				if(contentChilds[contentChilds_Length].className == 'wrap'){
			 		remove(contentChilds[contentChilds_Length]);
			 	} else {
			 		l++;
			 		wrapDeleteCount++;
				}
			}
		// Удаление первого wrap
		} else {
			remove(selector('.wrap'));
		}
		// Если контент пуст, то тогда отправить на страницу владельца
		if(selector('.content').firstElementChild == null){
			link('/profile?userid='+owner_id);
		}
	}
}

/**
 * Вывод кнопки подписаться на пользователя, 
 * так же осуществляет подписку и отписку
 *
 * @param {integer} who_id. Получает id пользователя, для проверки подписки на него.
 * @param {boolean} follow_action. Выполнять подписку или проверку
 * 	Значение true отправляет подписку или отписку на пользователя.
 * 	Значение false проверяет на подписчика.
 */
function follow(who_id, follow_action = false){
	ajax.get('/dev/profile/follows/FollowYou.php',{
		query: { 
			who_id: who_id,
			follow_action: follow_action
		},
		onDone:function(followClass){
			let followStatus = selector('#user_follow');
			followStatus.className = followClass;
		}
	});
}

/**
 * Окно с действиями.
 *
 * @param {integer} user_id. Получает id пользователя.
 * @param {integer} post_id. Получет id поста для действий.
 */
function ellipsisAction(user_id = 0, post_id = 0){
	// Анимация прелоада для десктопов.
	// Требуется для ожидания проверки на подписчика.
	if(myDevice == 'desktop'){
		pagePreload('start');
	}
	wrapLayer('500px', true);

	let wrapID = selector('#wrap_'+wrap_id+' > .wrap_window');
	// Создание слоя для кнопок
	let wrapBtnGroup = document.createElement('div');
	wrapBtnGroup.className = 'wrap_btn_group';
	wrapID.appendChild(wrapBtnGroup);

	/**
	 * Функция для создания кнопок в wrap
	 *
	 * @param {object} obj. Обьект с параметрами.
	 */
	function tempWrapBtn(obj){
		let wrapBtn = document.createElement('a');
		wrapBtn.href = obj.href;
		wrapBtn.id = obj.id;
		wrapBtn.className = obj.className;
		wrapBtn.innerHTML = obj.html;
		wrapBtn.setAttribute('onclick', obj.onclick);
		wrapBtnGroup.appendChild(wrapBtn);
	}

	if(app.id != user_id){
		tempWrapBtn({
			href: '#',
			id: 'user_follow',
			className: '',
			html: '',
			onclick: `follow('`+user_id+`', true);return false;`
		});
		follow(user_id, false);
	} else {
		if(page.name == 'profile'){
			tempWrapBtn({
				href: '#',
				id: '',
				className: 'wrap_btn',
				html: 'Настройки профиля',
				onclick: `link('/profile/setting');removeWrapLayer('all');return false;`
			});

			tempWrapBtn({
				href: '/dev/auth/logout.php',
				id: '',
				className: 'wrap_btn',
				html: 'Выйти из профиля',
				onclick: ''
			});
		}
	}
	if(page.name == 'photoview' && app.id == user_id){
		tempWrapBtn({
			href: '#',
			id: '',
			className: 'wrap_btn',
			html: 'Удалить запись',
			onclick: `postDelete();return false;`
		});
	}
	if(page.name == 'feed'){
		tempWrapBtn({
			href: '#',
			id: '',
			className: 'wrap_btn',
			html: 'Перейти к записи',
			onclick: `link('/photoview?photo=`+post_id+`', false);removeWrapLayer(1, true, false);return false;`
		});
	}
	if(page.name != 'profile'){
		tempWrapBtn({
			href: '#',
			id: '',
			className: 'wrap_btn',
			html: 'Перейти к профилю пользователя',
			onclick: `link('/profile?userid=`+user_id+`');removeWrapLayer('all');return false;`
		});
	}
	tempWrapBtn({
		href: '#',
		id: '',
		className: 'wrap_btn',
		html: '<span class="fa fa-close wrap_action_icon"></span> Закрыть окно',
		onclick: `removeWrapLayer(1, true);return false;`
	});
	pagePreload('stop');
}

/**
 * Блок с данными и с ellipsis о пользователе
 *
 * @param {object} obj. Обьект с параметрами.
 */
function userBlock(obj){		
	if(obj.user_avatar == ''){
		obj.user_avatar = '/img/avatar.jpg';
	}
	if(obj.ellipsis == true){
		obj.ellipsis = `
		<div 
			class="user_action_post fa fa-ellipsis-h" 
			style="font-size: 24px;"
			onclick="ellipsisAction('`+obj.user_id+`','`+obj.post_id+`');"
		>
		</div>`;
	}
	return `
		<div class="user_block">
			<div class="user_link">
				<div class="user_img" onclick="link('/profile?userid=`+obj.user_id+`');removeWrapLayer('all')">
					<img data-src="`+obj.user_avatar+`">
				</div>
				<div class="user_info">
					<div class="user_nickname">
						<span>`+obj.user_name+`</span>
					</div>
					<div class="user_desc">
						<span>`+obj.user_desc+`</span>
					</div>
				</div>
			</div>`
		+obj.ellipsis+
		`</div>
	`;
}


function checkPostOnLike(array){
	return (array.like_id > 0) ? 'pv_like_on' : 'pv_like_off';
}


function sendLike(el, post_likes_id, post_id){	
	if(el.classList.contains('pv_like_off')){
		el.classList.add('pv_like_on');
		el.classList.remove('pv_like_off');
	} else {
		el.classList.add('pv_like_off');
		el.classList.remove('pv_like_on');
	}

	ajax.get('/dev/photoview/SendLike.php',{
		query: { post_id: post_id },
		onDone:function(countPostLikes){
			var countPostLikes = JSON.parse(escapeSpecialChars(countPostLikes));
			selector(`div[photo_likes_id="`+post_likes_id+`"]`).innerHTML = countPostLikes.photo_likes;
		}
	});
}

