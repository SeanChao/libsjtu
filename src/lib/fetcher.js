import axios from 'axios';

const libraryUrl = process.env.REACT_APP_LIBRARY_PROXY;

export const getLibraryData = async (onSuccess, onFail) => {
  axios
    .get(libraryUrl)
    .then((res) => {
      if (res.status === 200) {
        const dataLibRaw = res.data;
        const dataLibMatcher = dataLibRaw.match(/CountPerson\((.*)\)/);
        const dataLib = dataLibMatcher.length > 1 ? JSON.parse(dataLibMatcher[1]).numbers : [];
        onSuccess && onSuccess(dataLib);
      } else {
        onFail && onFail();
      }
    })
    .catch(() => onFail && onFail());
};

export const getCanteenData = async (onSuccess, onFail) => {
  axios
    .get('https://canteen.sjtu.edu.cn/CARD/Ajax/Place')
    .then((res) => {
      if (res.status === 200) {
        onSuccess && onSuccess(res.data);
      } else {
        onFail && onFail();
      }
    })
    .catch(() => onFail && onFail());
};
