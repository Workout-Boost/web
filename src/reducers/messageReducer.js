import {
    WELCOME_MESSAGE
} from '../actions/types'
export default (state = 'Loading...', action) => {
    switch (action.type) {
        case WELCOME_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}