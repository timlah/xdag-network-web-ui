import React, { Component } from 'react';

const detectTabUse = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isUsingTab: false
      };
    }

    componentDidMount = () => {
      window.addEventListener('keydown', this.handleFirstTab);
    };

    componentWillUnmount = () => {
      window.removeEventListener('keydown', this.handleFirstTab);
    };

    handleFirstTab = e => {
      if (e.code === 'Tab' || e.keyCode === 9) {
        this.setState({
          isUsingTab: true
        });

        window.removeEventListener('keydown', this.handleFirstTab);
      }
    };

    render() {
      const { isUsingTab } = this.state;
      return <WrappedComponent isUsingTab={isUsingTab} {...this.props} />;
    }
  };

export default detectTabUse;
