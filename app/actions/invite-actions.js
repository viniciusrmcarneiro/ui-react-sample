"use strict";
import 'whatwg-fetch';
import * as actionTypes from './index.js';

export function goHome(){
    return {
        type: actionTypes.INVITE_GO_HOME,
    };
}

export function inviteRequest(){
    return {
        type: actionTypes.INVITE_REQUEST,
    };
}


export function sendInviteSuccess(){
    return {
        type: actionTypes.INVITE_SEND_SUCCESS,
    };
}
export function sendInviteFail(error){
    return {
        type: actionTypes.INVITE_SEND_FAIL,
        error,
    };
}

export function sendInvite({name, email,}){
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.INVITE_SEND,
        });
        return Promise.resolve({
            json: () => Promise.resolve({}),
            status: 200,
        })
        .then(response => {
            return response.json()
                .then(json => {
                    if (response.status == 200){
                        return dispatch(sendInviteSuccess());
                    }

                    if (json.errorMessage){
                        const tmpMsg = json.errorMessage.split(':');
                        return dispatch(sendInviteFail(tmpMsg.length > 1 ? tmpMsg[1] : json.errorMessage));
                    }
                    throw new Error('Invalid response');
                })
        })
        .catch((ex) => {
            console.log({ex})
            return dispatch(sendInviteFail('Internal error'));
        });
    };
}
