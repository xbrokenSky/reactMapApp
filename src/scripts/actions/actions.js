import C from '../constants';
import { getId } from '../helpers';

export const addPoint = (point) => {
    return {
        type: C.ADD_POINT,
        payload: {
            ...point,
            id: getId(),
        },
    };
};

export const delPoint = (id) => {
    return {
        type: C.DELETE_POINT,
        payload: id,
    };
};

export const setCoords = (coords) => {
    return {
        type: C.SET_COORDS,
        payload: coords,
    };
};

export const updatePoint = (point) => {
    return {
        type: C.UPDATE_POINT,
        payload: point,
    };
};

export const switchPoints = (newState) => {
    return {
        type: C.SWITCH_POINTS,
        payload: {
            newState,
            switchDate: Date.now(),
        },
    };
};
