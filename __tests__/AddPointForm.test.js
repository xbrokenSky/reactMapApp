import React from 'react';
import { shallow } from 'enzyme';
import { AddPointForm } from '../src/scripts/components/AddPointForm';

describe('check AddPointForm component', () => {
    const addPoint = jest.fn();
    const centerCoords = [11.11, 22.22];
    const component = shallow(<AddPointForm addPoint={addPoint} centerCoords={centerCoords} />);

    it('it should render <form> element', () => {
        const result = component.find('form.add-point-form').length;

        expect(result).toBe(1);
    });

    it('it does not call dispatch whith empty value', () => {
        component.find('form.add-point-form').simulate('submit', {
            preventDefault() {},
        });

        expect(addPoint).not.toBeCalled();
    });

    it('it invokes submit method correctly', () => {
        const instance = component.instance();
        instance.state.pointValue = 'test';
        instance.submit({
            preventDefault() {},
            target: {
                value: 'test',
            },
        });

        expect(instance.state.pointValue).toBe('');
        expect(addPoint).toBeCalledWith({
            point: 'test',
            centerCoords,
        });
    });

    it('it should update inner state depend on user\'s input', () => {
        expect(component.state('pointValue')).toBe('');

        component.find('input.add-point-form__point-input.form-control')
            .simulate('change', {
                target: {
                    name: 'pointValue',
                    value: 'test',
                },
            });

        expect(component.state('pointValue')).toBe('test');
    });
});
