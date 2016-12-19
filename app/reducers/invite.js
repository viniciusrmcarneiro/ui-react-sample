"use strict";
import {
    INVITE_GO_HOME,
    INVITE_REQUEST,

    INVITE_SEND,
    INVITE_SEND_SUCCESS,
    INVITE_SEND_FAIL,
} from 'app/actions';

const initialState = {
    currentPage: 'home',
    request: {
        sending: false,
        error: undefined,
    }
}

export default function invite( state = initialState, action ){
    switch (action.type) {
        case INVITE_GO_HOME:
            return initialState;

        case INVITE_REQUEST:
            return Object.assign({}, initialState, {
                currentPage: 'request-invite',
            });

        case INVITE_SEND:
            return Object.assign({}, state, {
                currentPage: 'request-invite',
                request: Object.assign({}, initialState.request, {
                    sending: true,
                })
            });

        case INVITE_SEND_SUCCESS:
            return Object.assign({}, state, {
                currentPage: 'request-sent',
                request: Object.assign({}, state.request, {
                    sending: false,
                })
            });

        case INVITE_SEND_FAIL:
            return Object.assign({}, state, {
                currentPage: 'request-invite',
                request: Object.assign({}, state.request, {
                    sending: false,
                    error: action.error,
                })
            });

        default:
            return state
    }
};
