import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css'

class EditInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const {
			user_name,
			user_desc,
			country_id,
			user_website
		} = this.props.settingInfo;

		return (
			<div className="setting_form_group">
				<span>Имя пользователя:</span>
				<input id="setting_username" className="setting_form_group_in" type="text" name="username" maxLength="30" defaultValue={user_name}/>
				<span>Страна:</span>
				<select id="setting_country" className="setting_form_group_in" type="text" name="country" defaultValue={country_id}>
					<option value="0">Не выбрано</option>
					<option value="4">Австралия</option>
					<option value="63">Австрия</option>
					<option value="81">Азербайджан</option>
					<option value="173">Ангуилья</option>
					<option value="177">Аргентина</option>
					<option value="245">Армения</option>
					<option value="7716093">Арулько</option>
					<option value="248">Беларусь</option>
					<option value="401">Белиз</option>
					<option value="404">Бельгия</option>
					<option value="425">Бермуды</option>
					<option value="428">Болгария</option>
					<option value="467">Бразилия</option>
					<option value="616">Великобритания</option>
					<option value="924">Венгрия</option>
					<option value="971">Вьетнам</option>
					<option value="994">Гаити</option>
					<option value="1007">Гваделупа</option>
					<option value="1012">Германия</option>
					<option value="1206">Голландия</option>
					<option value="2567393">Гондурас</option>
					<option value="277557">Гонконг</option>
					<option value="1258">Греция</option>
					<option value="1280">Грузия</option>
					<option value="1366">Дания</option>
					<option value="2577958">Доминиканская республика</option>
					<option value="1380">Египет</option>
					<option value="1393">Израиль</option>
					<option value="1451">Индия</option>
					<option value="277559">Индонезия</option>
					<option value="277561">Иордания</option>
					<option value="3410238">Ирак</option>
					<option value="1663">Иран</option>
					<option value="1696">Ирландия</option>
					<option value="1707">Испания</option>
					<option value="1786">Италия</option>
					<option value="1894">Казахстан</option>
					<option value="2163">Камерун</option>
					<option value="2172">Канада</option>
					<option value="582029">Карибы</option>
					<option value="2297">Кипр</option>
					<option value="2303">Киргызстан</option>
					<option value="2374">Китай</option>
					<option value="582040">Корея</option>
					<option value="2430">Коста-Рика</option>
					<option value="582077">Куба</option>
					<option value="2443">Кувейт</option>
					<option value="2448">Латвия</option>
					<option value="582060">Ливан</option>
					<option value="2505884">Ливан</option>
					<option value="2509">Ливия</option>
					<option value="2514">Литва</option>
					<option value="2614">Люксембург</option>
					<option value="582041">Македония</option>
					<option value="277563">Малайзия</option>
					<option value="582043">Мальта</option>
					<option value="2617">Мексика</option>
					<option value="582082">Мозамбик</option>
					<option value="2788">Молдова</option>
					<option value="2833">Монако</option>
					<option value="2687701">Монголия</option>
					<option value="582065">Морокко</option>
					<option value="277551">Нидерланды</option>
					<option value="2837">Новая Зеландия</option>
					<option value="2880">Норвегия</option>
					<option value="582051">О.А.Э.</option>
					<option value="582105">Остров Мэн</option>
					<option value="582044">Пакистан</option>
					<option value="582046">Перу</option>
					<option value="2897">Польша</option>
					<option value="3141">Португалия</option>
					<option value="3156">Реюньон</option>
					<option value="3159">Россия</option>
					<option value="277555">Румыния</option>
					<option value="5647">Сальвадор</option>
					<option value="277565">Сингапур</option>
					<option value="582067">Сирия</option>
					<option value="5666">Словакия</option>
					<option value="5673">Словения</option>
					<option value="5678">Суринам</option>
					<option value="5681">США</option>
					<option value="9575">Таджикистан</option>
					<option value="277567">Тайвань</option>
					<option value="582050">Тайланд</option>
					<option value="582090">Тунис</option>
					<option value="9638">Туркменистан</option>
					<option value="277569">Туркмения</option>
					<option value="9701">Туркс и Кейкос</option>
					<option value="9705">Турция</option>
					<option value="9782">Уганда</option>
					<option value="9787">Узбекистан</option>
					<option value="9908">Украина</option>
					<option value="10648">Финляндия</option>
					<option value="10668">Франция</option>
					<option value="277553">Хорватия</option>
					<option value="10874">Чехия</option>
					<option value="582031">Чили</option>
					<option value="10904">Швейцария</option>
					<option value="10933">Швеция</option>
					<option value="582064">Эквадор</option>
					<option value="10968">Эстония</option>
					<option value="3661568">ЮАР</option>
					<option value="11002">Югославия</option>
					<option value="11014">Южная Корея</option>
					<option value="582106">Ямайка</option>
					<option value="11060">Япония</option>
				</select>
				<span>Веб-сайт:</span>
				<input id="setting_website" className="setting_form_group_in" type="text" placeholder="http://" name="website" maxLength="150" defaultValue={user_website}/>
				<span>Описание профиля:</span>
				<textarea id="setting_desc" className="setting_form_group_in" maxLength="250" rows="3" defaultValue={user_desc}/>
				<div className="setting_send">
					<div className="btn_black setting_send_btn" type="submit">Отправить</div>
				</div>
			</div>
		);
	}
}

EditInfo.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
	return {
		//fetchData: (url) => dispatch(jsonFetchData(url))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
