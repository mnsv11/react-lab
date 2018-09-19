import { combineReducers} from 'redux';
import topics from './topicReducer';

const rootReducer = combineReducers({
   topics
});

export default rootReducer;