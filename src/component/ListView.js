import React, { useMemo } from 'react';
import Bar from './Bar';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';

const ListView = (props) => {
  const title = props.title;
  const listData = useMemo(
    () =>
      props.data && props.data.length > 0
        ? [...props.data].sort((a, b) => {
            if (a.max === 0) {
              return 1;
            } else if (b.max === 0) {
              return -1;
            }
            return b.rest / b.max - a.rest / a.max;
          })
        : [],
    [props.data]
  );
  const renderList = (list) =>
    list.map((ele) => (
      <Grid item key={ele.name}>
        <Bar name={ele.name} rest={ele.rest} max={ele.max} key={ele.name} />
      </Grid>
    ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>{title}</h2>
      <Grid container spacing={4} direction="column">
        {props.loading && <CircularProgress style={{ alignSelf: 'center', marginTop: '30px', marginBottom: '30px' }} />}
        {renderList(listData)}
      </Grid>
    </div>
  );
};

export default ListView;

ListView.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, rest: PropTypes.number, max: PropTypes.number })).isRequired,
  loading: PropTypes.bool,
};
