import { combineReducers, createStore } from 'redux';
import game from './game';
import players from './players';
import participatants from './participatants';

export default createStore(combineReducers({ game, players, participatants }));
