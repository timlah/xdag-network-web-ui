import React from 'react';
import PropTypes from 'prop-types';
import {
  FiPower,
  FiGitPullRequest,
  FiGitMerge,
  FiMonitor,
  FiBox,
  FiHardDrive,
  FiBarChart,
  FiCpu,
  FiMapPin,
  FiClipboard,
  FiGift,
  FiUser,
  FiUsers
} from 'react-icons/fi';
import { observer } from 'mobx-react';
import { FaUsers } from 'react-icons/fa';

import poolsStore from '../../stores/pools';
import PoolTable from './poolTable';

const PoolTableContainer = () => {
  const columns = [
    {
      key: 'name',
      text: 'Pool name',
      icon: <FiHardDrive />,
      align: 'left'
    },
    {
      key: 'isVisibleInCharts',
      text: 'Chart data',
      icon: <FiBarChart />,
      align: 'left'
    },
    {
      key: 'version',
      text: 'XDAG version',
      icon: <FiCpu />,
      align: 'left'
    },
    {
      key: 'location',
      text: 'Location',
      icon: <FiMapPin />,
      align: 'left'
    },
    {
      key: 'mining_address',
      text: 'Mining address',
      icon: <FiClipboard />,
      align: 'left'
    },
    {
      key: 'state',
      text: 'State',
      icon: <FiPower />,
      align: 'left'
    },
    {
      key: 'payment_pool',
      text: 'Pool fee',
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 576 512"
          height="1em"
          width="1em"
        >
          <path d="m 10.731819,237.9 c 11.8,10.7 30.2,10 42.6,0 L 145.73182,164 c 11.3,-9.1 25.4,-14 40,-14 h 118.3 c 8.8,0 16,7.2 16,16 0,8.8 -7.2,16 -16,16 h -78.3 c -15.9,0 -30.7,10.9 -33.3,26.6 -3.3,20 12.1,37.4 31.6,37.4 h 160 c 27,0 53.1,-9.3 74.1,-26.3 l 46.5,-37.7 h 55.4 c 8.8,0 16,-7.2 16,-16 V 70 c 0,-8.8 -7.2,-16 -16,-16 h -356.8 c -14.5,0 -28.6,4.9 -40,14 L 12.031819,189 c -15.1999996,12.1 -16.3999996,35.3 -1.3,48.9 z" />
          <circle
            cx="160"
            cy="384"
            r="70"
            style={{
              fill: 'none',
              strokeWidth: 50,
              strokeMiterlimit: 4,
              strokeDasharray: 'none'
            }}
          />
        </svg>
      ),
      align: 'right',
      distribution: true
    },
    {
      key: 'payment_community',
      text: 'Community donation',
      icon: <FiGift />,
      align: 'right',
      distribution: true
    },
    {
      key: 'payment_finder',
      text: 'Finder reward',
      icon: <FiUser />,
      align: 'right',
      distribution: true
    },
    {
      key: 'payment_contributor',
      text: 'Contributor reward',
      icon: <FiUsers />,
      align: 'right',
      distribution: true
    },
    {
      key: 'payment_all',
      text: 'Pool miners',
      icon: <FaUsers />,
      align: 'right',
      distribution: true
    },
    {
      key: 'hashrate',
      text: 'Hashrate',
      icon: <FiBox />,
      align: 'right',
      suffix: 'H/s'
    },
    {
      key: 'hosts',
      text: 'Hosts',
      icon: <FiMonitor />,
      align: 'right'
    },
    {
      key: 'orphanBlocks',
      text: 'Orphan blocks',
      icon: <FiGitPullRequest />,
      align: 'right'
    },
    {
      key: 'waitSyncBlocks',
      text: 'Wait sync blocks',
      icon: <FiGitMerge />,
      align: 'right'
    }
  ];

  return (
    <PoolTable
      columns={columns}
      data={poolsStore.data}
      headerCellHeight="6.5rem"
    />
  );
};

export default observer(PoolTableContainer);
