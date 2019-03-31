import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPoint } from '../../actions';
import './AddPointForm.scss';

export class AddPointForm extends React.PureComponent {
    static defaultProps = {
        addPoint: (f) => { return f; },
        centerCoords: [],
    };

    static propTypes = {
        addPoint: PropTypes.func,
        centerCoords: PropTypes.arrayOf(PropTypes.number),
    };

    constructor(props) {
        super(props);

        this.state = {
            pointValue: '',
        };
    }

    setPointValue = (e) => {
        const field = e.target.name;
        const pointValue = e.target.value.trim();

        this.setState((state) => {
            return {
                ...state,
                [field]: pointValue,
            };
        });
    }

    submit = (e) => {
        e.preventDefault();
        /* eslint-disable-next-line no-shadow */
        const { centerCoords, addPoint } = this.props;
        const { pointValue } = this.state;

        if (pointValue === '') {
            return null;
        }

        const point = {
            point: pointValue,
            centerCoords,
        };

        addPoint(point);

        this.setState({
            pointValue: '',
        });

        return null;
    };

    render() {
        return (
            <form
                className='add-point-form'
                method='post'
                onSubmit={this.submit}
            >
                <input
                    className='add-point-form__point-input form-control'
                    type='text'
                    value={this.state.pointValue}
                    name='pointValue'
                    onChange={this.setPointValue}
                    placeholder='type new point here'
                />
            </form>
        );
    }
}

const mapStateToProps = ({ currentMapCenter }) => {
    return {
        centerCoords: currentMapCenter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPoint: (point) => {
            dispatch(addPoint(point));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPointForm);
