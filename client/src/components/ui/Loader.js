import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/scss/components/ui/loader.scss';

const Loader = ({ text }) => (
    <div className={styles.loader}>
        <div className={styles.loading} />
        <div className={styles['loading-text']}>{text}</div>
    </div>
);

Loader.propTypes = {
    text: PropTypes.string.isRequired
};

export default Loader;
