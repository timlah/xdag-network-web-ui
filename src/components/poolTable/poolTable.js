import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import classNames from 'classnames/bind';
import scrollBarSize from 'dom-helpers/util/scrollbarSize';

import DistributionInfo from './distributionInfo';
import Tooltip from '../tooltip';
import CellContent from './cellContent';
import style from './poolList.scss';

const scrollBarWidth = scrollBarSize();
const cx = classNames.bind(style);

const CellHeaders = ({
  createRefs,
  NodeType,
  filterColumnIndex,
  headerCellRefs,
  headerCellHeight,
  columns
}) =>
  columns.map(({ key, icon, text, align, distribution }, columnIndex) => {
    const className = cx({
      cell: true,
      cellHeader: true,
      cellHeaderDistribution: distribution
    });

    if (filterColumnIndex !== undefined && columnIndex !== filterColumnIndex) {
      return null;
    }

    return (
      <NodeType
        ref={createRefs ? headerCellRefs[columnIndex] : null}
        key={key}
        style={{
          textAlign: align,
          width: createRefs
            ? 'auto'
            : headerCellRefs[columnIndex].current.offsetWidth,
          height: headerCellHeight
        }}
        className={className}
      >
        {!createRefs && key === 'payment_pool' && <DistributionInfo />}
        <span className={style.headerIcon}>{icon}</span>
        <span className={style.headerText}>{text}</span>
      </NodeType>
    );
  });

CellHeaders.defaultProps = {
  createRefs: false,
  NodeType: 'th'
};

const BodyCells = ({
  createRefs,
  RowNodeType,
  CellNodeType,
  filterColumnIndex,
  fixedColumnRefs,
  data,
  columns
}) =>
  data.map((pool, rowIndex) => (
    <RowNodeType key={pool.id} className={style.row}>
      {columns.map(({ key, align, suffix }, columnIndex) => {
        if (
          filterColumnIndex !== undefined &&
          columnIndex !== filterColumnIndex
        ) {
          return null;
        }

        return (
          <CellNodeType
            ref={
              createRefs && columnIndex === 0 ? fixedColumnRefs[rowIndex] : null
            }
            key={key}
            className={style.cell}
            style={{
              textAlign: align,
              height: createRefs
                ? 'auto'
                : fixedColumnRefs[rowIndex].current.offsetHeight,
              width: createRefs
                ? 'auto'
                : fixedColumnRefs[rowIndex].current.offsetWidth,
              visibility: createRefs && columnIndex === 0 ? 'hidden' : 'visible'
            }}
          >
            <CellContent
              pool={pool}
              header={key}
              align={align}
              suffix={suffix}
            />
          </CellNodeType>
        );
      })}
    </RowNodeType>
  ));

BodyCells.defaultProps = {
  createRefs: false,
  CellNodeType: 'td',
  RowNodeType: 'tr'
};

const FixedCorner = ({ headerCellHeight, ...props }) => (
  <div className={style.fixedCorner} style={{ height: headerCellHeight }}>
    <CellHeaders
      NodeType="div"
      filterColumnIndex={0}
      headerCellHeight={headerCellHeight}
      {...props}
    />
  </div>
);

FixedCorner.propTypes = {};

const FixedHeader = ({ tableRef, ...props }) => (
  <div
    className={style.fixedHeader}
    style={{
      width: tableRef.current.offsetWidth + scrollBarWidth
    }}
  >
    <CellHeaders NodeType="div" {...props} />
  </div>
);

FixedHeader.propTypes = {};

const FixedColumn = ({ tableRef, ...props }) => (
  <div
    className={style.fixedColumn}
    style={{
      height: tableRef.current.offsetHeight + scrollBarWidth
    }}
  >
    <BodyCells
      RowNodeType="div"
      CellNodeType="div"
      filterColumnIndex={0}
      {...props}
    />
  </div>
);

FixedColumn.propTypes = {};

class PoolTable extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRefs: false, horizontalScroll: false };
    this.headerCellRefs = props.columns.map(() => React.createRef());
    this.fixedColumnRefs = props.data.map(() => React.createRef());
    this.tableContainerRef = React.createRef();
    this.tableRef = React.createRef();
    this.fixedHeaderContainerRef = React.createRef();
    this.fixedColumnContainerRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ activeRefs: true });
    this.handleHorizontalOverflow(this.state);
  }

  componentDidUpdate(previousProps, prevState) {
    this.handleHorizontalOverflow(prevState);
  }

  handleHorizontalOverflow = prevState => {
    const node = this.tableContainerRef.current;
    const verticalScroll = node.offsetHeight !== node.scrollHeight;

    if (
      !prevState.horizontalScroll &&
      node.offsetWidth - (verticalScroll ? scrollBarWidth : 0) <
        node.scrollWidth
    ) {
      this.setState({
        horizontalScroll: true
      });
    } else if (
      prevState.horizontalScroll &&
      node.offsetWidth - (verticalScroll ? scrollBarWidth : 0) >=
        node.scrollWidth
    ) {
      this.setState({
        horizontalScroll: false
      });
    }
  };

  onScroll = e => {
    this.fixedColumnContainerRef.current.scrollTop = e.target.scrollTop;
    this.fixedHeaderContainerRef.current.scrollLeft = e.target.scrollLeft;
  };

  render() {
    const { activeRefs, horizontalScroll } = this.state;
    const { headerCellHeight, data, columns } = this.props;

    return (
      <div className={style.container}>
        <div
          className={style.fixedHeaderContainer}
          ref={this.fixedHeaderContainerRef}
        >
          {activeRefs && (
            <FixedHeader
              headerCellRefs={this.headerCellRefs}
              headerCellHeight={headerCellHeight}
              tableRef={this.tableRef}
              columns={columns}
            />
          )}
        </div>
        <div
          className={style.fixedColumnContainer}
          ref={this.fixedColumnContainerRef}
          style={{
            height: `calc(100% - ${
              horizontalScroll ? scrollBarWidth : 0
            }px - ${headerCellHeight})`
          }}
        >
          {activeRefs && (
            <FixedColumn
              fixedColumnRefs={this.fixedColumnRefs}
              tableRef={this.tableRef}
              data={data}
              columns={columns}
            />
          )}
        </div>
        {activeRefs && (
          <FixedCorner
            headerCellRefs={this.headerCellRefs}
            headerCellHeight={headerCellHeight}
            columns={columns}
          />
        )}
        <div
          className={style.tableContainer}
          onScroll={this.onScroll}
          ref={this.tableContainerRef}
        >
          <table
            className={style.table}
            style={{ marginTop: `-${headerCellHeight}` }}
            ref={this.tableRef}
          >
            <thead className={style.tableHead}>
              <tr>
                <CellHeaders
                  createRefs
                  headerCellRefs={this.headerCellRefs}
                  headerCellHeight={headerCellHeight}
                  columns={columns}
                />
              </tr>
            </thead>
            <tbody className={style.body}>
              <BodyCells
                createRefs
                fixedColumnRefs={this.fixedColumnRefs}
                data={data}
                columns={columns}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

PoolTable.propTypes = {
  headerCellHeight: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

const ResponsivePoolTable = props => (
  <ReactResizeDetector handleWidth refreshMode="throttle" refreshRate={100}>
    <PoolTable {...props} />
  </ReactResizeDetector>
);
export default ResponsivePoolTable;
