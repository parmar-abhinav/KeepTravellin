import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Dishes } from './dishes';
// import { Comments } from './comments';
// import { Promotions } from './promotions';
// import { Leaders } from './leaders';
// import { favorites } from './favorites';
import { Profile } from './profile';
import { Auth } from './auth';
import { Registration } from './registration';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            profile: Profile,
            registration: Registration
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}