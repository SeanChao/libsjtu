import React, { useEffect, useState } from 'react';
import ListView from '../component/ListView';
import { Container, Grid, Snackbar, Tab, Tabs } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getCanteenData, getLibraryData } from '../lib/fetcher';
import Footer from '../component/Footer';
import { useLocalStorageState } from 'ahooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  campusFilter: {
    marginTop: theme.spacing(1),
  },
}));

const filterCampus = (dataList, campusId) => dataList.filter((item) => (campusId === 0) ^ item.name.includes('徐汇'));

const HomeView = () => {
  const classes = useStyles();
  const [campus, setCampus] = useLocalStorageState('campus', 0);

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
        <div className={classes.campusFilter}>
          <Tabs value={campus} indicatorColor="primary" textColor="primary" onChange={(_, value) => setCampus(value)} centered>
            <Tab label="闵行" />
            <Tab label="徐汇" />
          </Tabs>
        </div>
        <Grid container justify="center" direction="column" spacing={2}>
          <Grid item style={{ marginTop: '20px' }}>
            <ListView title="📖" data={filterCampus(dataLib, campus)} loading={libDataLoading} />
          </Grid>
          <Grid item>
            <ListView title="🍴" data={filterCampus(dataCanteen, campus)} loading={canteenDataLoading} />
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
        <Footer />
      </Container>
    </>
  );
};

export default HomeView;
