import React,{
    PropTypes,
} from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Alert from 'react-bootstrap/lib/Alert';

import {sendInvite,goHome,} from 'app/actions/invite-actions';

require('app/stylus/waiting.styl');

class RequestInviteBase extends React.Component {
    static displayName = "RequestInvite";
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSendRequest: PropTypes.func.isRequired,
        request: PropTypes.shape({
            sending: PropTypes.bool.isRequired,
            error: PropTypes.string,
        }),
    };

    constructor(){
        super();

        this.state = {
            fields: {},
            showing: true,
        };
    }
    requestToClose(){
        clearTimeout(this.blurToHandle);
        this.setState({showing: false});
    }

    getField(fieldName){
        const currentField = this.state.fields[fieldName] || _fieldDefaultValue;
        const field = {
            input: {
                onChange: this.handleChange.bind(this, fieldName),
                onBlur: this.handleBlur.bind(this, fieldName),
                value: currentField.value,
            },
            group: {},
            valid: _fieldValidators[fieldName](currentField.value, this.state.fields),
        };

        if (currentField.touched && typeof field.valid != "undefined"){
            if (field.valid === true){
                field.group.validationState = 'success';
            } else if (field.valid === false){
                field.group.validationState = 'error';
            } else if (typeof field.valid === 'string'){
                field.group.validationState = 'error';
                field.children = [<HelpBlock key='error'>{field.valid}</HelpBlock>]
            }
        }

        return field;
    }

    componentDidMount(){
        this.inputFullName.focus();
    }

    handleBlur(fieldName) {
        // for a nice visual effect, when closing the modal
        this.blurToHandle = setTimeout(() => {
            const {fields} = this.state;
            const currentField = fields[fieldName] || _fieldDefaultValue;

            fields[fieldName] = Object.assign({}, currentField, {
                touched: true,
            });

            this.setState({
                fields,
            });
        }, 50)
    }

    handleChange(fieldName, e) {
        const {fields} = this.state;
        const currentField = fields[fieldName] || _fieldDefaultValue;
        const value = e.target.value; 

        if (currentField.value === value){
            return;
        }

        fields[fieldName] = Object.assign({}, currentField, {
            value,
        });

        this.setState({fields});
    }

    sendRequest(){
        const {fields} = this.state;
        const allFields = ['fullName','email','email2'];
        
        // marking all fields as touched
        allFields.map(field => {
            if (!fields[field] || fields[field].touched !== true){
                fields[field] = Object.assign({}, _fieldDefaultValue, {
                    touched: true,
                });
            };
        });

        // setting fields as touched, so the invalid fields will be highlighted
        this.setState({fields}, () => {
            for (var i=0; i < allFields.length; i++){
                // if there is invalid field, should return
                if (this.getField(allFields[i]).valid !== true){
                    return;
                }
            };

            this.props.onSendRequest({
                email: fields.email.value,
                name: fields.fullName.value,
            });

        });
    }

    render(){
        const fullName = this.getField('fullName');
        const email = this.getField('email');
        const email2 = this.getField('email2');

        return (
            <Modal
                bsSize="sm"
                bsClass="modal"
                backdrop={true}
                show={this.state.showing}
                autoFocus={true}
                keyboard={true}
                style={{display:'inherited'}}
                className="vertical-center"
                onHide={() => this.requestToClose()}
                onExited={() => this.props.onClose()}
            >
                <div className="container-waiting-view">
                    {this.props.request.sending && <div className="waiting-view"><span className="text">Sending request...</span></div>}
                    <div className={this.props.request.sending && "container-waiting-blur"}>
                        <Modal.Header>
                            <Modal.Title>Request an invite</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                <FormGroup controlId="fullName" {...(fullName.group)}>
                                    <FormControl
                                        tabIndex="1"
                                        disabled={this.props.request.sending}
                                        ref={(cmp) => {
                                            this.inputFullName = ReactDOM.findDOMNode(cmp) || this.inputFullName;
                                        }}
                                        {...(fullName.input)}
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                    {fullName.children}
                                </FormGroup>

                                <FormGroup controlId="email" {...(email.group)}>
                                    <FormControl
                                        tabIndex="2"
                                        disabled={this.props.request.sending}
                                        {...(email.input)}
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {email.children}
                                </FormGroup>

                                <FormGroup controlId="email2" {...(email2.group)}>
                                    <FormControl
                                        tabIndex="3"
                                        disabled={this.props.request.sending}
                                        {...(email2.input)}
                                        type="email"
                                        placeholder="Confirm email"
                                    />
                                    {email2.children}
                                </FormGroup>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                                <Button
                                    tabIndex="4"
                                    disabled={this.props.request.sending}
                                    block
                                    onClick={() => this.sendRequest()}
                                >Send</Button>
                        </Modal.Footer>                
                        {this.props.request.error && <Alert bsStyle="danger" style={{margin:'0 15px 15px'}}>{this.props.request.error}</Alert>}
                    </div>
                </div>
            </Modal>

        );
    }
};

export const RequestInvite = RequestInviteBase;
export default connect(
    (state) => ({
        request: state.invite.request
    }),
    (dispatch) => bindActionCreators({
        onSendRequest: sendInvite,
        onClose: goHome,
    }, dispatch),
)(RequestInvite);

const _fieldValidators = {
    fullName: (value) => value.length >= 3 ? true : 'Name must be at least 3 words' ,
    email: (value) => /([\d\w]+[\.\w\d]*)\+?([\.\w\d]*)?@([\w\d]+[\.\w\d]*)/.test(value) || 'Invalid email',
    email2: (value, fields) => {
        const emailValid = _fieldValidators.email((fields.email || {}).value);
        if (!fields.email || emailValid !== true){
            return false;
        }

        const email = fields.email.value;
        return value === email ? true : 'Confirm email must be equals to email';
    },
};

const _fieldDefaultValue = {
    value: '',
    touched: false,
};
