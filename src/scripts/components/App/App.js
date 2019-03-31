import React from 'react';
import html5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider as DragProvider } from 'react-dnd';
import MainPage from '../pages';

const App = () => {
    return (
        <DragProvider backend={html5Backend}>
            <MainPage />
        </DragProvider>
    );
};

export default App;
