import {
    GET_POST
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POST:
            return action.payload;
        default:
            return state;
    }
}