import { createStore } from 'redux';
import questionReducers from './question/questionReducers';


const store = createStore(questionReducers);

export default store;