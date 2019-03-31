import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { delPoint, switchPoints } from '../../actions';
import itemTypes from '../../itemTypes';
import DragPointItem from '../PointItem';
import './PointsList.scss';

export const PointsList = React.memo(({ pointData, removePoint, changePointsOrder, connectDropTarget }) => {
    const findItem = (id) => {
        const pointItem = pointData.filter((item) => {
            return item.id === id;
        })[0];

        return {
            pointItem,
            index: pointData.indexOf(pointItem),
        };
    };
    const moveItem = (id, atIndex) => {
        const { pointItem, index } = findItem(id);

        changePointsOrder(
            update(pointData, {
                $splice: [[index, 1], [atIndex, 0, pointItem]],
            }),
        );
    };
    const points = pointData.map((item) => {
        const { id, point } = item;
        return (
            <DragPointItem
                key={id}
                pointId={id}
                point={point}
                removePoint={() => { removePoint(id); }}
                findItem={findItem}
                moveItem={moveItem}
            />
        );
    });

    return connectDropTarget(
        <ul className='points-list'>
            {points}
        </ul>
    );
});

PointsList.defaultProps = {
    pointData: [],
    removePoint: (f) => { return f; },
    changePointsOrder: (f) => { return f; },
    connectDropTarget: (f) => { return f; },
};
PointsList.propTypes = {
    pointData: PropTypes.array,
    removePoint: PropTypes.func,
    changePointsOrder: PropTypes.func,
    connectDropTarget: PropTypes.func,
};

const mapStateToprops = ({ pointData }) => {
    return {
        pointData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removePoint: (id) => {
            dispatch(delPoint(id));
        },
        changePointsOrder: (newState) => {
            dispatch(switchPoints(newState));
        },
    };
};

const itemTarget = {
    drop() {

    },
};
/* eslint no-shadow: off */
export default DropTarget(itemTypes.POINT_ITEM, itemTarget, (connect) => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
})(connect(mapStateToprops, mapDispatchToProps)(PointsList));
