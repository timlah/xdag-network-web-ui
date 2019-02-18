import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './option.scss';

const cx = classNames.bind(style);

class Label extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    };
  }

  handleFocusToggle = () => {
    this.setState(({ isFocused }) => ({
      isFocused: !isFocused
    }));
  };

  handleChange = () => {
    const { checked, activate, value } = this.props;
    if (!checked) activate(value);
  };

  render() {
    const { isFocused } = this.state;
    const { text, checked, value } = this.props;
    const labelClassName = cx({
      option: true,
      isActive: checked,
      isFocused
    });

    return (
      <label className={labelClassName}>
        {text}
        <input
          className={style.hiddenInput}
          type="radio"
          name="dataSwitcher"
          value={value}
          checked={checked}
          onChange={this.handleChange}
          onFocus={this.handleFocusToggle}
          onBlur={this.handleFocusToggle}
        />
      </label>
    );
  }
}

Label.propTypes = {
  checked: PropTypes.bool.isRequired,
  activate: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string.isRequired
};

export default Label;
