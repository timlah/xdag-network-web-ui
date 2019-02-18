import React, { memo, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { scaleLinear } from 'd3-scale';
import { interpolateCool } from 'd3-scale-chromatic';
import { timeFormat } from 'd3-time-format';
import {
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  FlexibleWidthXYPlot
} from 'react-vis';

import style from './chart.scss';

const cx = classNames.bind(style);
const formatCrosshairTime = timeFormat('%a %d %H:%M');
const margin = {
  top: 5,
  right: 20,
  bottom: 35,
  left: 55,
  axis: 10
};

const CrosshairValue = memo(({ className, format, value, suffix }) => (
  <span className={className}>
    {value && format ? format(value) : value}
    {value ? suffix : null}
  </span>
));

const series = ({ data, type, onNearestX, key, color, yValue }) => {
  switch (type) {
    case 'bar':
      return (
        <VerticalBarSeries
          stroke={0}
          data={data}
          barWidth={0.2}
          onNearestX={onNearestX}
        />
      );
    default:
      return (
        <LineSeries
          color={color}
          className={style.line}
          strokeWidth="1px"
          data={data}
          getNull={d => d[yValue] !== null}
          onNearestX={onNearestX}
          key={key || null}
          curve="curveMonotoneX"
          style={{ fill: 'none' }}
        />
      );
  }
};

class Chart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      crosshairValues: false,
      crosshairIndex: 0
    };
  }

  getDomain = (value, aggFunc) => {
    const { data, dataKey, isDataGroup } = this.props;

    return isDataGroup
      ? aggFunc(
          ...data.map(d => aggFunc(...d[dataKey].map(entry => entry[value])))
        )
      : aggFunc(...data.map(entry => entry[value]));
  };

  onMouseLeave = () => {
    this.setState({ crosshairValues: false });
  };

  onNearestX = (value, { index }) => {
    const { crosshairIndex } = this.state;
    const { data, isDataGroup, dataKey } = this.props;
    const values = isDataGroup
      ? data.map(dataGroup => ({
          ...dataGroup,
          ...dataGroup[dataKey][index]
        }))
      : [data[index]];

    if (index !== crosshairIndex) {
      this.setState({
        crosshairValues: values,
        crosshairIndex: index
      });
    }
  };

  render() {
    const { crosshairValues } = this.state;
    const {
      isDataGroup,
      yFormat,
      height,
      type,
      data,
      dataKey,
      xValue,
      yValue,
      ySuffix,
      crosshairFormat,
      crosshairGroupIdentifier
    } = this.props;

    const yRange = {
      min: this.getDomain(yValue, Math.min),
      max: this.getDomain(yValue, Math.max)
    };

    if (yRange.min === yRange.max) {
      yRange.max += 10;
      yRange.min -= 10;
    }

    const barColorScale = scaleLinear()
      .domain([yRange.min, yRange.max])
      .range([1, 0.15]);

    return (
      <div onMouseLeave={this.onMouseLeave}>
        <FlexibleWidthXYPlot
          animation
          margin={margin}
          xType="time"
          height={height}
          getX={d => d[xValue]}
          getY={d => d[yValue]}
          getColor={d => interpolateCool(barColorScale(d[yValue]))}
          colorType="literal"
          yDomain={[
            type === 'bar'
              ? yRange.min - (yRange.max - yRange.min) / 10
              : yRange.min,
            yRange.max
          ]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            tickSize={4}
            tickPadding={10}
            top={height - margin.bottom + margin.axis}
            tickTotal={5}
          />
          <YAxis
            tickTotal={Math.round(height / 50)}
            tickSize={4}
            tickPadding={10}
            tickFormat={v => (yFormat ? yFormat(v) : v)}
            left={-margin.axis}
          />
          {isDataGroup
            ? data.map((d, i) =>
                series({
                  yValue,
                  color: d.color,
                  data: d[dataKey],
                  type,
                  onNearestX: this.onNearestX,
                  key: d.id ? d.id : i
                })
              )
            : series({ data, type, onNearestX: this.onNearestX })}
          {crosshairValues && (
            <Crosshair values={crosshairValues}>
              <div>
                <CrosshairValue
                  className={cx({
                    crosshairDate: true,
                    crosshairGroupDate: crosshairGroupIdentifier
                  })}
                  value={crosshairValues[0][xValue]}
                  format={formatCrosshairTime}
                />
                <table className={style.crosshairTable}>
                  <tbody>
                    {crosshairValues.map((d, i) => (
                      <tr key={d.id ? d.id : i}>
                        {crosshairGroupIdentifier && (
                          <td className={style.crosshairCell}>
                            <span
                              className={style.crosshairGroupColor}
                              style={{ backgroundColor: d.color }}
                            />
                            {d[crosshairGroupIdentifier]}
                          </td>
                        )}
                        <td className={style.crosshairCell}>
                          <CrosshairValue
                            format={crosshairFormat}
                            value={d[yValue]}
                            suffix={ySuffix}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Crosshair>
          )}
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

Chart.propTypes = {
  height: PropTypes.number.isRequired,
  xValue: PropTypes.string.isRequired,
  yValue: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['line', 'bar']).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
  ySuffix: PropTypes.string,
  isDataGroup: PropTypes.bool,
  dataKey: PropTypes.string,
  yFormat: PropTypes.func,
  crosshairFormat: PropTypes.func,
  crosshairGroupIdentifier: PropTypes.string
};

Chart.defaultProps = {
  isDataGroup: false,
  crosshairFormat: undefined,
  crosshairGroupIdentifier: undefined,
  ySuffix: undefined,
  dataKey: undefined,
  yFormat: undefined
};

export default Chart;
