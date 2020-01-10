import React, { Fragment } from 'react';
import { FiInfo } from 'react-icons/fi';

import Title from '../title';
import appStore from '../../stores/app';
import style from './poolList.scss';

const DistributionInfo = ({ t }) => (
  <div className={style.distributionContainer}>
    <button
      type="button"
      className={style.distributionIcon}
      onClick={() => {
        appStore.openModal(
          <Fragment>
            <Title key="title" Node="h2">
              Block Reward Distribution
            </Title>
              <p>
                When you mine XDAG in a pool and a block is found, the block
                rewards (1024 XDAG) are distributed according to the pool’s
                setup.
                <br key="ReactWantsAKeyHere" />
                This setup is divided into the following parts:
              </p>
              <ul>
                <li>Pool fee</li>
                <li>Community fund donation</li>
                <li>Reward to a miner who found the block</li>
                <li>Reward to miners who contributed to finding the block</li>
              </ul>
              <p>
                <strong>The remaining amount</strong> is distributed evenly to
                everyone mining on the pool.
              </p>
          </Fragment>
        );
      }}
    >
      <FiInfo />
    </button>
    <span className={style.distributionTitle}>
      Block Reward Distribution
    </span>
  </div>
);

export default (DistributionInfo);
