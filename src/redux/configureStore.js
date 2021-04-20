import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Dishes } from './dishes';
// import { Comments } from './comments';
// import { Promotions } from './promotions';
// import { Leaders } from './leaders';
// import { favorites } from './favorites';
import { Profile } from './profile';
import { Auth } from './auth';
import { Registration } from './registration';
import { Stories } from './stories';
import { Destination } from './destination';
import { Services } from './services';
import { Facility } from './facility';
import { UpdateProfile } from './updateprofile';
import {Story} from './story';
import {Trip} from './trip';
import {Check} from './check';
import {Wish} from './wish';
import {Request} from './request';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            profile: Profile,
            registration: Registration,
            stories: Stories,
            destination: Destination,
            services: Services,
            facility: Facility,
            updateprofile: UpdateProfile,
            trip: Trip,
            request: Request,
            check: Check,
            story: Story,
            wish: Wish
        }),
        // applyMiddleware(thunk, logger)
        applyMiddleware(thunk)
    );

    return store;
}