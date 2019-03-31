import React from 'react';
import { shallow, mount } from 'enzyme';
import { PointItem } from '../src/scripts/components/PointItem';

describe('check PointItem component', () => {
    it('it has <li> tag', () => {
        const result = shallow(<PointItem />).find('li').length;

        expect(result).toBe(1);
    });

    describe('check <p> element', () => {
        it('it renders correctly', () => {
            const result = shallow(<PointItem />)
                .find('p.point-item__point-txt').length;

            expect(result).toBe(1);
        });

        it('it render correct point\'s label', () => {
            const text = 'testPoint';
            const result = mount(<PointItem point={text} />)
                .find('p.point-item__point-txt')
                .text();

            expect(result).toEqual(text);
        });
    });

    describe('check <button> element', () => {
        it('it renders correctly', () => {
            const result = shallow(<PointItem />)
                .find('button.point-item__del-btn.btn.btn-danger').length;

            expect(result).toBe(1);
        });

        it('it calls removePoint func on click', () => {
            const func = jest.fn();

            mount(<PointItem removePoint={func} />)
                .find('button.point-item__del-btn.btn.btn-danger')
                .simulate('click');

            expect(func).toHaveBeenCalledTimes(1);
        });
    });
});
