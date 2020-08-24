import React, { useEffect, useState } from 'react';
import ListView from './component/ListView';
import { Container, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getCanteenData, getLibraryData } from './lib/fetcher';

const HomeView = () => {
  const [dataCanteen, setDataCanteen] = useState([]);
  const [dataLib, setDataLib] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const fetchData = async () => {
    const openSnackbar = (msg) => {
      setShowSnackbar(true);
      setSnackbarMsg(msg);
    };
    getCanteenData(
      (data) => setDataCanteen(data),
      () => {
        openSnackbar('😥 获取食堂数据失败');
      }
    );
    getLibraryData(
      (data) => setDataLib(data),
      () => {
        openSnackbar('😫 获取图书馆数据失败');
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, [snackbarMsg]);

  useEffect(() => {
    const interval = setInterval(() => fetchData(), 20000);
    return () => clearInterval(interval);
  }, []);

  const closeSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarMsg('');
  };

  return (
    <>
      <Container>
        <Grid container justify="center">
          <ListView title="📖" data={dataLib} />
          <ListView title="🍴" data={dataCanteen} />
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={() => closeSnackbar()}
        >
          <MuiAlert severity="error">{snackbarMsg}</MuiAlert>
        </Snackbar>
      </Container>
    </>
  );
};

export default HomeView;
