import {
    GET_UID
} from '../actions/types'

export default (state = {userId: null,username: null}, action) => {
    switch (action.type) {
        case GET_UID:
            return action.payload;
        default:
            return state;
    }
}