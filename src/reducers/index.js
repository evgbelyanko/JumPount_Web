import { combineReducers } from 'redux'

import menu from './menu'
import follows from './follows'
import photoView from './photoView'
import getPageData from './getPageData'
import setPageConf from './setPageConf'
import panelPosts from './getPanelPosts'

export default combineReducers({
	menu: menu,
	follows: follows,
	photoView: photoView,
	pageData: getPageData,
	pageConf: setPageConf,
	panelPosts: panelPosts,
});