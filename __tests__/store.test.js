import store from '../src/scripts/store';

describe('check store', () => {
    it('return correct state', () => {
        const result = store.getState();

        expect(result).toEqual({
            pointData: [],
            currentMapCenter: [55.76, 37.64],
            deletedId: null,
            lastPointsUpdate: null,
        });
    });
});
