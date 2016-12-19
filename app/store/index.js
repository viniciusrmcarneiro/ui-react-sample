import { createStore, applyMiddleware, combineReducers, } from 'redux';
import thunk from 'redux-thunk';
import { reducers as AppReducers, } from 'app/reducers';

export default function configureStore() {
    const initialState = {}
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(
        combineReducers(AppReducers),
        initialState
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('app/reducers', () => {
            const nextAppReducers = require('app/reducers').reducers;
            store.replaceReducer(combineReducers(nextAppReducers));
        });
    }

    return store;
}
