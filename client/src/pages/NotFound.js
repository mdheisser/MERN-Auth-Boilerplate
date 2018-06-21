import React from 'react';
import helpers from '../assets/scss/helpers.scss';

const NotFound = () => (
    <div className={helpers['center-screen']}>
        <h1 style={{ textAlign: 'center' }}>Ooops, page not found.</h1>
    </div>
);

export default NotFound;
