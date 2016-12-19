import React,{
    PropTypes,
} from 'react';

import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';

import styles from './home.styl';
import Header from './header';
import Footer from './footer';

import RequestInvite from 'app/components/request-invite';
import RequestSent from 'app/components/request-sent';

import {inviteRequest,} from 'app/actions/invite-actions';



class HomeBase extends React.Component {
    static displayName = "Home";
    static propTypes = {
        currentPage: PropTypes.string.isRequired,
        showInviteRequest: PropTypes.func.isRequired,
    };

    render(){
        return (
            <div>
                <Header/>

                <div className={styles.middle}>
                    <h1 className={`${styles.title} ${styles.homeLine}`}>
                        A better way<br/>
                        to enjoy every day.<br/>
                        <small className={styles.homeLine}>Be the first to know when we lauch.</small>
                    </h1>
                    <div className={styles.homeLine}>
                        <Button onClick={() => this.props.showInviteRequest()}>Request an invite</Button>
                    </div>
                </div>

                {this.props.currentPage === 'request-invite' &&  <RequestInvite/>}
                {this.props.currentPage === 'request-sent' && <RequestSent/>}

                <Footer/>
            </div>
        );
    }
};
export const Home = HomeBase;
export default connect(
    (state) => ({currentPage: state.invite.currentPage}),
    (dispatch) => bindActionCreators({
        showInviteRequest: inviteRequest,
    }, dispatch)
)(Home);
