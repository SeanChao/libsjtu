import axios from 'axios';

const libraryUrl = process.env.REACT_APP_LIBRARY_PROXY;
const canteenUrl = 'https://canteen.sjtu.edu.cn/CARD/Ajax/Place';

export const getLibraryData = async (onSuccess, onFail) => {
  axios
    .get(libraryUrl)
    .then((res) => {
      if (res.status === 200) {
        const dataLibRaw = res.data;
        const dataLibMatcher = dataLibRaw.match(/CountPerson\((.*)\)/);
        const dataLib = dataLibMatcher.length > 1 ? JSON.parse(dataLibMatcher[1]).numbers : [];
        const formatted = dataLib.map((e) => ({ name: e.areaName, rest: e.max - e.inCounter, max: e.max }));
        onSuccess && onSuccess(formatted);
      } else {
        onFail && onFail();
      }
    })
    .catch(() => onFail && onFail());
};

export const getCanteenData = async (onSuccess, onFail) => {
  axios
    .get(canteenUrl)
    .then((res) => {
      if (res.status === 200) {
        const formatted = res.data.map((e) => ({ name: e.Name, rest: e.Seat_s - e.Seat_u, max: e.Seat_s }));
        onSuccess && onSuccess(formatted);
      } else {
        onFail && onFail();
      }
    })
    .catch(() => onFail && onFail());
};
