'use strict';
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import { shallow, mount, render } from 'enzyme';

import chai,{expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'

const sinon = require('sinon');

import {Home} from 'app/components/home';

chai.use(chaiEnzyme());

describe('<Home />', function(){

    it('should call showInviteRequest when user click on the button', function(){
        const onShowInviteRequest = sinon.spy();
        const wrapper = shallow(
            <Home 
                currentPage='home'
                showInviteRequest={onShowInviteRequest}
            />
        );

        const sendButton = wrapper.findWhere(n => n.type() === Button);
        sendButton.simulate('click');
        expect(onShowInviteRequest).to.have.property('callCount', 1);

    });

});

