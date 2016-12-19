"use strict";
import 'whatwg-fetch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {expect} from 'chai';


import {
    inviteRequest,
    sendInvite,
    goHome,
} from 'app/actions/invite-actions';

import {
    INVITE_GO_HOME,
    INVITE_SEND,
    INVITE_SEND_SUCCESS,
    INVITE_SEND_FAIL,
} from 'app/actions';


const sinon = require('sinon');


describe('INVITE ACTIONS', function(){
    let _fetch;

    let sandbox;
    let middlewares = [ thunk ];
    let mockStore = configureMockStore(middlewares);
    let fetchStub;

    before(() => {
        _fetch = fetch;
    });

    after(() => {
        fetch = _fetch;
    });


    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('invite request success', function(){
        const expectedActions = [
            {
                type: INVITE_SEND,
            },
            {
                type: INVITE_SEND_SUCCESS,
            },
        ];

        fetch = () => Promise.resolve({
            status: 200,
            json: () => Promise.resolve(JSON.stringify('Registered')),
        });

        const store = mockStore({});

        return store.dispatch(sendInvite({
            email:'m@k.com',
            name:'name',
        }))
        .then(() =>{
             expect(store.getActions()).to.be.deep.equals(expectedActions);
        })
    });

    it('invite request fail', function(){
        const expectedActions = [
            {
                type: INVITE_SEND,
            },
            {
                type: INVITE_SEND_FAIL,
                error: ' xpto',
            },
        ];

        fetch = () => Promise.resolve({
            status: 400,
            json: () => Promise.resolve({errorMessage:'Bad Request: xpto'}),
        });

        const store = mockStore({}, expectedActions);

        return store.dispatch(sendInvite({
            email:'m@k.com',
            name:'name',
        })).then(() =>{
             expect(store.getActions()).to.be.deep.equals(expectedActions);
        })
    });

    it('another error', function(){
        const expectedActions = [
            {
                type: INVITE_SEND,
            },
            {
                type: INVITE_SEND_FAIL,
                error: 'Internal error',
            },
        ];

        fetch = () => Promise.resolve({
            status: 500,
            json: () => Promise.resolve('Another error'),
        });

        const store = mockStore({}, expectedActions);

        return store.dispatch(sendInvite({
            email:'m@k.com',
            name:'name',
        })).then(() =>{
             expect(store.getActions()).to.be.deep.equals(expectedActions);
        })
    });

    it('reject response', function(){
        const expectedActions = [
            {
                type: INVITE_SEND,
            },
            {
                type: INVITE_SEND_FAIL,
                error: 'Internal error',
            },
        ];

        fetch = () => Promise.resolve({
            status: 500,
            json: () => Promise.reject('Another error'),
        });

        const store = mockStore({}, expectedActions);

        return store.dispatch(sendInvite({
            email:'m@k.com',
            name:'name',
        })).then(() =>{
             expect(store.getActions()).to.be.deep.equals(expectedActions);
        })
    });

    it('go to home', function(){
        const expectedActions = [
            {
                type: INVITE_GO_HOME,
            },
        ];

        const store = mockStore({});

        store.dispatch(goHome());
        expect(store.getActions()).to.be.deep.equals(expectedActions);
    })

});
