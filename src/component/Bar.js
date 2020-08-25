import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const colorList = {
  green: ['#4caf50', '#e8f5e9'],
  blue: ['#2196f3', '#e3f2fd'],
  yellow: ['#ff9800', '#fff3e0'],
  red: ['#f44336', '#fbe9e7'],
  default: ['#eceff1', '#607d8b'],
};

const Bar = (props) => {
  const name = props.name;
  const rest = props.rest;
  const max = props.max;
  const percentage = (rest / max) * 100;

  const mapColor = (val) => {
    let scheme = '';
    if (val >= 75) {
      scheme = 'green';
    } else if (val >= 50) {
      scheme = 'blue';
    } else if (val >= 25) {
      scheme = 'yellow';
    } else if (val < 25) {
      scheme = 'red';
    } else {
      scheme = 'default';
    }
    const barColor = colorList[scheme][0];
    const color = colorList[scheme][1];
    return {
      colorPrimary: {
        backgroundColor: color,
      },
      barColorPrimary: {
        backgroundColor: barColor,
      },
    };
  };
  const style = makeStyles(() => mapColor(percentage));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', marginRight: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '10px' }}>
        <div style={{ marginRight: 'auto' }}>{name}</div>
        <div style={{ marginLeft: 'auto' }}>
          <b>{rest}</b>/{max}
        </div>
      </div>
      <LinearProgress variant="determinate" value={percentage} classes={style()} />
    </div>
  );
};

export default Bar;

Bar.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
