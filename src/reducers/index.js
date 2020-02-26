import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import result from './events'

export default combineReducers({ result, form })