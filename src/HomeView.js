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

  const [libDataLoading, setLibDataLoading] = useState(true);
  const [canteenDataLoading, setCanteenDataLoading] = useState(true);

  const fetchData = async () => {
    const openSnackbar = (msg) => {
      setShowSnackbar(true);
      setSnackbarMsg(msg);
    };
    getCanteenData(
      (data) => {
        setDataCanteen(data);
        setCanteenDataLoading(false);
      },
      () => {
        openSnackbar('😥 获取食堂数据失败');
      }
    );
    getLibraryData(
      (data) => {
        setDataLib(data);
        setLibDataLoading(false);
      },
      () => {
        openSnackbar('😫 获取图书馆数据失败');
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, [snackbarMsg]);

  useEffect(() => {
    const interval = setInterval(() => fetchData(), 10000);
    return () => clearInterval(interval);
  }, []);

  const closeSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarMsg('');
  };

  return (
    <>
      <Container>
        <Grid container justify="center" direction="column" spacing={2}>
          <Grid item style={{ marginTop: '20px' }}>
            <ListView title="📖" data={dataLib} loading={libDataLoading} />
          </Grid>
          <Grid item>
            <ListView title="🍴" data={dataCanteen} loading={canteenDataLoading} />
          </Grid>
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
