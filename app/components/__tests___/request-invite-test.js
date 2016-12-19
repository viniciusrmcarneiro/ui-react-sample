'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import chai,{expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'

import {RequestInvite} from 'app/components/request-invite';
const sinon = require('sinon');

chai.use(chaiEnzyme());

describe('<RequestInvite />', function(){

    it('should no send invite with invalid fields', function(){
        const expectedState = {
            fullName:{
                touched: true,
                value: '',
            },
            email:{
                touched: true,
                value: '',
            },
            email2:{
                touched: true,
                value: '',
            },
        };

        const wrapper = shallow(
            <RequestInvite 
                onClose={() =>{}}
                onSendRequest={() =>{}}
                request={{
                    sending: true,
                    error: undefined,
                }}
            />
        );

        const sendButton = wrapper.findWhere(n => n.type() === Button);
        sendButton.simulate('click');

        const state = wrapper.state();
        expect(state).to.property('fields').to.be.deep.equals(expectedState);
    });

    it('send button and inputs should be disabled when is sending', function(){
        const wrapper = shallow(
            <RequestInvite 
                onClose={() =>{}}
                onSendRequest={() =>{}}
                request={{
                    sending: true,
                    error: undefined,
                }}
            />
        );
        // button is disabled
        const sendButton = wrapper.findWhere(n => n.type() === Button);
        expect(sendButton.prop('disabled')).to.be.equals(true);
        
        const formsGroups = wrapper.findWhere(n => n.type() == FormGroup);
        // all input must be disabled
        formsGroups.children().nodes.forEach(node => expect(node).to.have.deep.property('props.disabled').to.be.equals(true));
    });

    it('should send invite', function(){
        const fields = {
            fullName:{
                touched: true,
                value: 'Name 1',
            },
            email:{
                touched: true,
                value: 'test@test.com',
            },
            email2:{
                touched: true,
                value: 'test@test.com',
            },
        };

        const onRequest = sinon.spy();
        const wrapper = shallow(
            <RequestInvite 
                onClose={() =>{}}
                onSendRequest={onRequest}
                request={{
                    sending: true,
                    error: undefined,
                }}
            />
        );

        wrapper.setState({ fields });

        const sendButton = wrapper.findWhere(n => n.type() === Button);
        sendButton.simulate('click');
        expect(onRequest).to.have.property('callCount', 1);
    });

    it('should show error message', function(){
        const request = {
            sending: false,
            error: 'Please try again',
        };

        const onRequest = sinon.spy();
        const wrapper = shallow(
            <RequestInvite 
                onClose={() =>{}}
                onSendRequest={onRequest}
                request={request}
            />
        );

        const messageError = wrapper.findWhere(n => n.type() === Alert);
        expect(messageError.prop('children')).to.be.equals(request.error);
    });
});

