import React from 'react';
import Bar from './Bar';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const ListView = (props) => {
  const title = props.title;
  const listData = props.data && props.data.length > 0 ? props.data.filter((e) => e.max > 0).sort((a, b) => b.rest / b.max - a.rest / a.max) : [];
  const renderList = (list) =>
    list.map((ele) => (
      <Grid item key={ele.name}>
        <Bar name={ele.name} rest={ele.rest} max={ele.max} key={ele.name} />
      </Grid>
    ));

  return (
    <>
      <h2>{title}</h2>
      <Grid container spacing={4} direction="column">
        {renderList(listData)}
      </Grid>
    </>
  );
};

export default ListView;

ListView.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, rest: PropTypes.number, max: PropTypes.number })).isRequired,
};
