import React from 'react';
import ConnectedAddPointForm from '../AddPointForm';
import ConnectedPointsList from '../PointsList';
import ConnectedMapComponent from '../MapComponent';
import './MainPage.scss';

const MainPage = () => {
    const { ymaps } = window;

    return (
        <section className='main-page'>
            <div className='main-page__list-wrapper'>
                <ConnectedAddPointForm />
                <ConnectedPointsList />
            </div>
            <ConnectedMapComponent ymaps={ymaps} />
        </section>
    );
};

export default MainPage;
