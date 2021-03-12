import {
    FOLLOWING
} from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case FOLLOWING:
            return action.payload;
        default:
            return state;
    }
}