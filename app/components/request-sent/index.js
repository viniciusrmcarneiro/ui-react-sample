import React,{
    PropTypes,
} from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux';

import { goHome, } from 'app/actions/invite-actions';
require('./request-sent.styl');

class RequestSentBase extends React.Component {
    static displayName = "RequestSent";
    static propTypes = {
        goHome: PropTypes.func.isRequired,
    };

    render(){
        return (
            <Modal
                bsSize="sm"
                backdrop="static"
                show={true}
                autoFocus={true}
                keyboard={false}
                style={{display:'inherited'}}
                className="vertical-center request-sent"
            >
                <Modal.Header>
                    <Modal.Title>All done!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>You will one of the first to experience<br/>Brocoli & Co. when we launch.</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button block bsStyle="default" onClick={() => this.props.goHome()}>OK</Button>
                </Modal.Footer>
            </Modal>

        );
    }
};

export const RequestSent = RequestSentBase;
export default connect(
    () => ({}),
    (dispatch) => bindActionCreators({
        goHome,
    }, dispatch),
)(RequestSent);

