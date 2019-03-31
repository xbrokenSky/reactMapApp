import React from 'react';
import { shallow, mount } from 'enzyme';
import { PointsList } from '../src/scripts/components/PointsList';
/* eslint react/prop-types: off */
jest.mock('../src/scripts/components/PointItem/', () => {
    return ({ removePoint, point }) => {
        return (
            <li
                className='point-item'
            >
                <p className='point-item__point-txt'>
                    {point}
                </p>
                <button
                    className='point-item__del-btn btn btn-danger'
                    type='button'
                    onClick={removePoint}
                >
                    Del
                </button>
            </li>
        );
    };
});

describe('check PointsList component', () => {
    const pointData = [
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
    const removePoint = jest.fn();
    const component = mount(<PointsList pointData={pointData} removePoint={removePoint} />);

    it('it renders <ul> element', () => {
        const result = shallow(<PointsList />)
            .find('ul.points-list').length;

        expect(result).toBe(1);
    });

    it('it render correct amount of list items', () => {
        const result = component.find('li.point-item').length;

        expect(result).toBe(2);
    });

    it('it delete correct list item', () => {
        component.find('button.point-item__del-btn.btn.btn-danger')
            .first().simulate('click');

        expect(removePoint).toBeCalledWith(123);
    });
});
