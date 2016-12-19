import deepFreeze from 'deep-freeze';
import {expect} from 'chai';

import reducer from 'app/reducers';

import {
    INVITE_GO_HOME,
    INVITE_REQUEST,

    INVITE_SEND,
    INVITE_SEND_SUCCESS,
    INVITE_SEND_FAIL,
} from 'app/actions';


describe('INVITE REDUCER', function(){

    it('go home', function(){
        const state = reducer(undefined, {
            invite: {
                currentPage: 'request-invite',
                request: {
                    sending: false,
                    error: undefined,
                }
            }
        });

        const action = {
            type: INVITE_GO_HOME,
        };

        const expectedState = {
            currentPage: 'home',
            request: {
                sending: false,
                error: undefined,
            }
        };

        deepFreeze(state);
        const newState = deepFreeze(reducer(state, action));
        expect(newState.invite).to.be.deep.equals(expectedState)
    });

    it('show request invite', function(){
        const state = reducer(undefined, {});
        const action = {
            type: INVITE_REQUEST,
        };

        const expectedState = {
            currentPage: 'request-invite',
            request: {
                sending: false,
                error: undefined,
            }
        };

        deepFreeze(state);
        const newState = deepFreeze(reducer(state, action));
        expect(newState.invite).to.be.deep.equals(expectedState)
    });
    it('sending request', function(){
        const state = reducer(undefined, {});
        const action = {
            type: INVITE_SEND,
        };

        const expectedState = {
            currentPage: 'request-invite',
            request: {
                sending: true,
                error: undefined,
            }
        };

        deepFreeze(state);
        const newState = deepFreeze(reducer(state, action));
        expect(newState.invite).to.be.deep.equals(expectedState)
    });

    it('send request success', function(){
        const state = reducer(undefined, {});
        const action = {
            type: INVITE_SEND_SUCCESS,
        };

        const expectedState = {
            currentPage: 'request-sent',
            request: {
                sending: false,
                error: undefined,
            }
        };

        deepFreeze(state);
        const newState = deepFreeze(reducer(state, action));
        expect(newState.invite).to.be.deep.equals(expectedState)
    });

    it('send request fail', function(){
        const state = reducer(undefined, {});
        const action = {
            type: INVITE_SEND_FAIL,
            error: 'something weird',
        };

        const expectedState = {
            currentPage: 'request-invite',
            request: {
                sending: false,
                error: action.error,
            }
        };

        deepFreeze(state);
        const newState = deepFreeze(reducer(state, action));
        expect(newState.invite).to.be.deep.equals(expectedState)
    });

});
