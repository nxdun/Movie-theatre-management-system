import {legacy_createStore as createStore , combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';




const reduser = combineReducers({});

const middleware = [thunk];

const store = createStore(
    reduser,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;