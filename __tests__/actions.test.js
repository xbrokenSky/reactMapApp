import {
    addPoint,
    delPoint,
    setCoords,
    updatePoint,
    switchPoints,
} from '../src/scripts/actions';
import C from '../src/scripts/constants';

describe('check action creators', () => {
    it('should return the value of the added point', () => {
        const result = addPoint({
            point: 'testPoint',
        });

        expect(result.payload.point).toBe('testPoint');
    });

    it('should return the value of the deleeted point', () => {
        const result = delPoint(2);

        expect(result.payload).toBe(2);
    });

    it('should return point\'s coordinates', () => {
        const result = setCoords(33);

        expect(result).toEqual({
            type: C.SET_COORDS,
            payload: 33,
        });
    });

    it('should return "update point" action', () => {
        const result = updatePoint({});

        expect(result).toEqual({
            type: C.UPDATE_POINT,
            payload: {},
        });
    });

    it('should return "switch points" action', () => {
        const result = switchPoints([]).payload.newState;

        expect(result).toEqual([]);
    });
});
