import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../src/scripts/components/pages';

describe('check MainPage component', () => {
    it('renders <section> element', () => {
        const result = shallow(<MainPage />).find('section.main-page').length;

        expect(result).toBe(1);
    });
});
