import {
    pointData,
    currentMapCenter,
    deletedId,
    lastPointsUpdate,
} from '../src/scripts/reducers';
import C from '../src/scripts/constants';

describe('check reducers', () => {
    describe('check pointData reducer', () => {
        it('should add point to store', () => {
            const state = [];
            const action = {
                type: C.ADD_POINT,
                payload: {
                    point: 'testPoint',
                    id: 13,
                    centerCoords: [55.33, 44.34],
                },
            };
            const result = pointData(state, action);

            expect(result).toEqual([
                {
                    point: 'testPoint',
                    id: 13,
                    centerCoords: [55.33, 44.34],
                },
            ]);
        });

        it('should remove point from store', () => {
            const state = [
                {
                    point: 'testPoint',
                    id: 13,
                    centerCoords: [55.33, 44.34],
                },
            ];
            const action = {
                type: C.DELETE_POINT,
                payload: 13,
            };
            const result = pointData(state, action).length;

            expect(result).toBe(0);
        });

        it('should update correct point in store', () => {
            const state = [
                {
                    point: 'testPoint',
                    id: 13,
                    centerCoords: [55.33, 44.34],
                },
                {
                    point: 'statePoint',
                    id: 33,
                    centerCoords: [11.11, 11.22],
                },
            ];
            const action = {
                type: C.UPDATE_POINT,
                payload: {
                    point: 'secondTestPoint',
                    id: 13,
                    centerCoords: [25.33, 14.34],
                },
            };
            const result = pointData(state, action);

            expect(result).toEqual([
                {
                    point: 'secondTestPoint',
                    id: 13,
                    centerCoords: [25.33, 14.34],
                },
                {
                    point: 'statePoint',
                    id: 33,
                    centerCoords: [11.11, 11.22],
                },
            ]);
        });

        it('should switch points in store', () => {
            const state = [
                {
                    point: 'testPoint',
                    id: 13,
                    centerCoords: [55.33, 44.34],
                },
                {
                    point: 'secondPoint',
                    id: 15,
                    centerCoords: [25.33, 14.34],
                },
            ];
            const action = {
                type: C.SWITCH_POINTS,
                payload: {
                    newState: [
                        {
                            point: 'secondPoint',
                            id: 15,
                            centerCoords: [25.33, 14.34],
                        },
                        {
                            point: 'testPoint',
                            id: 13,
                            centerCoords: [55.33, 44.34],
                        },
                    ],
                },
            };
            const result = pointData(state, action);

            expect(result).toEqual(action.payload.newState);
        });
    });

    describe('check currentMapCenter reducer', () => {
        it('should set new map center coordinates in store', () => {
            const state = [];
            const action = {
                type: C.SET_COORDS,
                payload: [55.37, 23.15],
            };
            const result = currentMapCenter(state, action);

            expect(result).toEqual(action.payload);
        });
    });

    describe('check deletedId reducer', () => {
        it('should set id of deleted point in store', () => {
            const state = null;
            const action = {
                type: C.DELETE_POINT,
                payload: 13,
            };
            const result = deletedId(state, action);

            expect(result).toEqual(action.payload);
        });
    });

    describe('check lastPointsUpdate reducer', () => {
        it('should set timestamp when last points update occured', () => {
            const state = null;
            const action = {
                type: C.SWITCH_POINTS,
                payload: {
                    switchDate: 13,
                },
            };
            const result = lastPointsUpdate(state, action);

            expect(result).toEqual(action.payload.switchDate);
        });
    });
});
