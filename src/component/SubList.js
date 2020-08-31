import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDetailedCanteenData } from '../lib/fetcher';
import ListView from './ListView';

const SubList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = props.data.id;

  useEffect(() => {
    getDetailedCanteenData(id, (data) => {
      setData(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => getDetailedCanteenData(id, (data) => setData(data)), 10000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div style={{ marginLeft: '5vw', marginRight: '5vw', marginTop: '16px' }}>
      <ListView title="" data={data} loading={loading} />
    </div>
  );
};

SubList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SubList;
