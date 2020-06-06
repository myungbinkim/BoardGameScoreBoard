import { combineReducers, createStore } from 'redux';
import game from './game';
import players from './players';

export default createStore(combineReducers({ game, players }));
