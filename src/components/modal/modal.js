import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';

import style from './modal.scss';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.closeButtonRef = React.createRef();
  }

  componentDidMount() {
    this.closeButtonRef.current.focus();
  }

  render() {
    const { content, close } = this.props;

    return (
      <div className={style.mainContainer}>
        <div
          role="presentation"
          className={style.closeOverlayTrigger}
          onClick={close}
        />
        <button
          className={style.closeButton}
          type="button"
          onClick={close}
          ref={this.closeButtonRef}
        >
          <FiX />
          <span className={style.screenReaderOnly}>Close modal</span>
        </button>
        <section className={style.content}>{content}</section>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  close: PropTypes.func.isRequired
};

Modal.defaultProps = {
  content: undefined
};

export default Modal;
