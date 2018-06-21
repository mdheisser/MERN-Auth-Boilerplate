import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/scss/components/ui/message.scss';

const Message = ({ status, icon, children }) => (
    <div className={`${styles.message} ${status}`}>
        <div className={styles['message-icon']}>
            <i className={icon} />
        </div>
        <div className={styles['message-text']}>{children}</div>
    </div>
);

Message.propTypes = {
    status: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Message;
