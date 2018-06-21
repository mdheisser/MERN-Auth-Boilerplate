import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/scss/components/ui/inlineError.scss';

const InlineError = ({ text }) => (
    <div className={styles.error}>{text}</div>
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;
