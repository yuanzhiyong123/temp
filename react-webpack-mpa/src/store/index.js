import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

const defaultState = {
	test: '测试',  //侧边菜单栏默认折叠状态
}

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'COLLAPSE_CHANGE':
			return { ...state }
		default:
			return { ...state }
	}
}

export const getList = () => {
	return (dispatch) => {
		axios.get('https://api.myjson.com/bins/16gzds').then(res => {
			let list = res.data.list;
			let action = {
				type: 'INIT_LIST',
				list
			}
			dispatch(action)
		})
	}
}


const composeEnHancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enHancer = composeEnHancer(applyMiddleware(reduxThunk))

export const store = createStore(reducer, enHancer)
