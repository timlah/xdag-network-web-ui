import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
// import Odometer from 'react-odometerjs';

import style from './animatedNumber.scss';

class AnimatedNumber extends Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      animating: true,
      startValue: 0,
      endValue: value
    };
  }

  componentDidMount() {
    // for CountUp callback function that uses setState
    this._isMounted = true;
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (value !== prevProps.value) {
      this.setState({ animating: true, endValue: value });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <span className={style.container}>
        {this.state.animating ? (
          <span className={style.animation}>
            <CountUp
              duration={3}
              start={this.state.startValue}
              end={this.state.endValue}
              formattingFn={this.props.format}
              onEnd={() => {
                if (this._isMounted)
                  this.setState({
                    animating: false,
                    startValue: this.state.endValue
                  });
              }}
            />
          </span>
        ) : null}
        <span style={{ opacity: this.state.animating ? '0' : '1' }}>
          {this.props.format
            ? this.props.format(this.props.value)
            : this.props.value}
        </span>
      </span>
    );
  }
}

export default AnimatedNumber;
