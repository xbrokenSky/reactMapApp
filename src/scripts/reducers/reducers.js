import { combineReducers } from 'redux';
import C from '../constants';

export const pointData = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case C.ADD_POINT:
            return [
                ...state,
                payload,
            ];
        case C.DELETE_POINT:
            return state.filter((item) => {
                return item.id !== payload;
            });
        case C.UPDATE_POINT:
            return state.map((item) => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
        case C.SWITCH_POINTS:
            return payload.newState;
        default:
            return state;
    }
};

export const currentMapCenter = (state = [55.76, 37.64], action) => {
    const { type, payload } = action;

    switch (type) {
        case C.SET_COORDS:
            return [
                ...payload,
            ];
        default:
            return state;
    }
};

export const deletedId = (state = null, action) => {
    const { type, payload } = action;

    switch (type) {
        case C.DELETE_POINT:
            return payload;
        default:
            return state;
    }
};

export const lastPointsUpdate = (state = null, action) => {
    const { type, payload } = action;

    switch (type) {
        case C.SWITCH_POINTS:
            return payload.switchDate;
        default:
            return state;
    }
};

const appReducer = combineReducers({
    pointData,
    currentMapCenter,
    deletedId,
    lastPointsUpdate,
});

export default appReducer;
