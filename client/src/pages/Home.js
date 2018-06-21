import React from 'react';
import AppHeader from '../components/global/AppHeader';
import bootstrap from '../assets/scss/bootstrap.scss';

const Home = () => (
    <div>
        <AppHeader />
        <div className={bootstrap.container}>
            <h1>Home page</h1>
        </div>
    </div>
);

export default Home;
