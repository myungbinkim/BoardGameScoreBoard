import { combineReducers, createStore } from 'redux';
import game from './game';
import players from './players';
import scores from './scores';

export default createStore(combineReducers({ game, players, scores }));
