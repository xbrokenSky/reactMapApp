import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../src/scripts/store';
import App from '../src/scripts/components/App';

jest.mock('../src/scripts/components/MapComponent', () => {
    return () => {
        return (
            <div>
                Map Mock
            </div>
        );
    };
});

describe('check App component', () => {
    it('it should render main page\'s <section> element', () => {
        const result = mount(<Provider store={store}><App /></Provider>)
            .find('section.main-page').length;

        expect(result).toBe(1);
    });
});
