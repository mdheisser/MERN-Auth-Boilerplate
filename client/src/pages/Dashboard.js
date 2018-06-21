import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppHeader from '../components/global/AppHeader';
import Message from '../components/ui/Message';
import styles from '../assets/scss/pages/dashboard.scss';
import bootstrap from '../assets/scss/bootstrap.scss';
import icons from '../assets/scss/ionicons.scss';
import message from '../assets/scss/components/ui/message.scss';

const Dashboard = ({ isConfirmed }) => (
    <div>
        <AppHeader />
        <div className={styles['dashboard-page']}>
            <div className={bootstrap.container}>
                {!isConfirmed && (
                    <Message status={message.negative} icon={icons['ion-android-warning']}>
                        Please verify your email address
                    </Message>
                )}
            </div>
        </div>
    </div>
);

Dashboard.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.auth.confirmed
    };
}

export default connect(mapStateToProps)(Dashboard);
