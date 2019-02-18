import React, { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react';

import appStore from '../../../stores/app';
import Modal from '../../modal';
import Tooltip from '../../tooltip';
import PoolLayout from '../pool';
import NetworkLayout from '../network';
import style from './main.scss';
import styleUtils from '../../../styles/utils.scss';

const MainLayout = () => {
  const transitionProps = {
    timeout: 1500,
    in: true,
    classNames: {
      appear: style.fadeAppear,
      appearActive: style.fadeAppearActive
    },
    appear: true
  };

  return (
    <Fragment>
      <TransitionGroup component={null}>
        <CSSTransition {...transitionProps}>
          <NetworkLayout />
        </CSSTransition>

        <CSSTransition {...transitionProps}>
          <PoolLayout />
        </CSSTransition>
      </TransitionGroup>

      <CSSTransition
        classNames={{
          enter: styleUtils.fadeEnter,
          enterActive: styleUtils.fadeEnterActive,
          exit: styleUtils.fadeExit,
          exitActive: styleUtils.fadeExitActive
        }}
        in={appStore.modalIsOpen}
        unmountOnExit
        timeout={300}
      >
        <Modal content={appStore.modalContent} close={appStore.closeModal} />
      </CSSTransition>

      <Tooltip />
    </Fragment>
  );
};

export default observer(MainLayout);
