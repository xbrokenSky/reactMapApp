import React from 'react';
import { shallow } from 'enzyme';
import { MapComponent } from '../src/scripts/components/MapComponent';

describe('check MapComponent component', () => {
    const mockedYmaps = {
        ready() {

        },
        Map() {

        },
    };
    const mockedPoints = [
        {
            id: 123,
            point: '123',
            centerCoords: [55.76, 33.76],
        },
        {
            id: 345,
            point: '345',
            centerCoords: [15.76, 83.76],
        },
    ];
    const setMapCenter = jest.fn();
    const updatePoint = jest.fn();
    const component = shallow(<MapComponent
        ymaps={mockedYmaps}
        points={mockedPoints}
        setMapCenter={setMapCenter}
        updatePoint={updatePoint}
    />);

    it('it should render <section> element', () => {
        const result = component.find('section.map-section').length;

        expect(result).toBe(1);
    });
});
