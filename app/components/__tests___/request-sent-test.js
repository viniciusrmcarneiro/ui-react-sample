'use strict';
import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import chai,{expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'

import {RequestSent} from 'app/components/request-sent';
const sinon = require('sinon');

chai.use(chaiEnzyme());

describe('<RequestInvite />', function(){

    it('should call goHome when user click on ok', function(){


        const goHome = sinon.spy();
        const wrapper = shallow(
            <RequestSent goHome={goHome}/>
        );

        const okButton = wrapper.findWhere(n => n.type() === Button);
        okButton.simulate('click');
        expect(goHome).to.have.property('callCount', 1);
    });

});

