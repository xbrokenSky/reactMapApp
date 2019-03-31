import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCoords, updatePoint } from '../../actions';
import { delFromObj } from '../../helpers';
import './MapComponent.scss';

export class MapComponent extends React.PureComponent {
    static defaultProps = {
        points: [],
        centerCoords: [],
        setMapCenter: (f) => { return f; },
        deletedId: null,
        updatePoint: (f) => { return f; },
        lastPointsUpdate: null,
        ymaps: {},
    };

    static propTypes = {
        points: PropTypes.arrayOf(PropTypes.object),
        centerCoords: PropTypes.arrayOf(PropTypes.number),
        setMapCenter: PropTypes.func,
        deletedId: PropTypes.number,
        updatePoint: PropTypes.func,
        lastPointsUpdate: PropTypes.number,
        ymaps: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.ymaps = this.props.ymaps;

        this.ymaps.ready(() => {
            this.customMap = new this.ymaps.Map('map', {
                center: this.props.centerCoords,
                zoom: 7,
            });

            return null;
        });

        this.state = {
            marks: {},
            lines: null,
            updates: 0,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.points.length > prevProps.points.length) {
            this.addMark();
            this.addLine();
        } else if (this.props.points.length < prevProps.points.length) {
            this.delMark();
            this.addLine();
        }

        if (prevState.updates !== this.state.updates) {
            this.addLine();
        }

        if (this.props.lastPointsUpdate !== prevProps.lastPointsUpdate) {
            this.addLine();
        }
    }

    addMark = () => {
        /* eslint-disable-next-line no-shadow */
        const { points, setMapCenter, updatePoint } = this.props;
        const { marks } = this.state;

        points.map((item) => {
            if (marks[item.id] === undefined) {
                const myPlacemark = new this.ymaps.Placemark(item.centerCoords, {
                    hintContent: item.point,
                    balloonContent: item.point,
                }, {
                    draggable: true,
                });

                this.customMap.geoObjects.add(myPlacemark);

                myPlacemark.events.add('dragend', () => {
                    const newCoords = myPlacemark.geometry.getCoordinates();
                    setMapCenter(newCoords);
                    updatePoint({
                        point: item.point,
                        id: item.id,
                        centerCoords: newCoords,
                    });
                    this.setState(({ updates }) => {
                        return {
                            updates: updates + 1,
                        };
                    });
                });

                this.customMap.panTo(item.centerCoords);
                this.setState({
                    marks: {
                        ...marks,
                        [item.id]: myPlacemark,
                    },
                });
            }
            return null;
        });
    };

    delMark = () => {
        const { deletedId } = this.props;
        const { marks } = this.state;
        const deletedMark = marks[deletedId];
        const currentMarks = delFromObj(marks, deletedId);

        this.customMap.geoObjects.remove(deletedMark);
        this.setState({
            marks: currentMarks,
        });
    }

    addLine() {
        const { points } = this.props;
        const { lines } = this.state;
        const coords = points.map((item) => {
            return item.centerCoords;
        });
        const myPolyline = new this.ymaps.Polyline(coords, {}, {
            strokeWidth: 6,
            strokeColor: '#0000FF',
        });

        if (lines !== null) {
            this.customMap.geoObjects.remove(lines);
        }

        this.customMap.geoObjects.add(myPolyline);
        this.setState({
            lines: myPolyline,
        });
    }

    render() {
        return (
            <section className='map-section'>
                <div
                    id='map'
                    className='map-section__map'
                />
            </section>
        );
    }
}

const mapStateToProps = ({ pointData, currentMapCenter, deletedId, lastPointsUpdate }) => {
    return {
        points: pointData,
        centerCoords: currentMapCenter,
        deletedId,
        lastPointsUpdate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMapCenter: (coords) => {
            dispatch(setCoords(coords));
        },
        updatePoint: (point) => {
            dispatch(updatePoint(point));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
