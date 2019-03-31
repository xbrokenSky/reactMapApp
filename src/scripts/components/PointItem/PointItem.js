import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import itemTypes from '../../itemTypes';
import './PointItem.scss';

export const PointItem = React.memo(({
    point,
    pointId,
    removePoint,
    findItem,
    moveItem,
    isDragging,
    connectDragSource,
    connectDropTarget,
}) => {
    const style = {
        opacity: (isDragging) ? 0.6 : 1,
        backgroundColor: (isDragging) ? 'lightgray' : 'transparent',
        cursor: 'move',
        transition: 'backgroundColor 130ms ease, opacity 130ms ease',
    };

    return connectDragSource(
        connectDropTarget(
            <li
                style={style}
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
        )
    );
});

PointItem.defaultProps = {
    point: '',
    pointId: null,
    removePoint: (f) => { return f; },
    findItem: (f) => { return f; },
    moveItem: (f) => { return f; },
    isDragging: false,
    connectDragSource: (f) => { return f; },
    connectDropTarget: (f) => { return f; },
};
PointItem.propTypes = {
    point: PropTypes.string,
    pointId: PropTypes.number,
    removePoint: PropTypes.func,
    findItem: PropTypes.func,
    moveItem: PropTypes.func,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
};

const itemSource = {
    beginDrag(props) {
        return {
            id: props.pointId,
            originalIndex: props.findItem(props.itemId).index,
        };
    },
    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.moveItem(droppedId, originalIndex);
        }
    },
};
const itemTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { pointId: overId } = props;
        if (draggedId !== overId) {
            const { index: overIndex } = props.findItem(overId);
            props.moveItem(draggedId, overIndex);
        }
    },
};

export default DropTarget(itemTypes.POINT_ITEM, itemTarget, (connect) => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
})(DragSource(itemTypes.POINT_ITEM, itemSource, (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
})(PointItem));
