/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { sessionTimeout } from '../redux/actions/userAction';

const useVerifySession = () => {

  const { time } = useSelector((state) => state.timer);

  const getTimeSessionToken = () => {
    const token = sessionStorage.getItem('token');
    if (token === undefined || token === null) { return null; };
    const sessionTime = token.split('&');
    if (sessionTime[1] !== null) {
      const year = parseInt(sessionTime[1].slice(0, 4), 10);
      const month = parseInt(sessionTime[1].slice(4, 6), 10);
      const day = parseInt(sessionTime[1].slice(6, 8), 10);
      const hour = parseInt(sessionTime[1].slice(8, 10), 10);
      const min = parseInt(sessionTime[1].slice(10, 12), 10);
      const tokenSessionTime = new Date(year, month - 1, day, hour, min, 0);
      return tokenSessionTime;
    }
  };

  const getCurrentTime = () => {
    const currentDate = new Date(Date(time.year, time.month, time.day, time.hour, time.minute, time.second)).toISOString();

    if (currentDate.length === 0 || currentDate === undefined) { return; }

    const year = parseInt(currentDate.slice(0, 4), 10);
    const month = parseInt(currentDate.slice(5, 7), 10);
    const day = parseInt(currentDate.slice(8, 10), 10);
    const hour = parseInt(currentDate.slice(11, 13), 10);
    const min = parseInt(currentDate.slice(14, 16), 10);
    const sec = parseInt(currentDate.slice(17, 19), 10);
    const currentDateTime = new Date(year, month - 1, day, hour, min, sec);
    return currentDateTime;
  };

  const checkSession = () => {
    const tokenTimeUTC = getTimeSessionToken();
    const currentDateUTC = getCurrentTime();
    if (tokenTimeUTC === null || tokenTimeUTC === undefined ||
      currentDateUTC === null || currentDateUTC === undefined) { return; };
    if (Math.sign(tokenTimeUTC - currentDateUTC) === -1) {
      store.dispatch(sessionTimeout());
    } else if (Number.isNaN(Math.sign(tokenTimeUTC - currentDateUTC))) {
      console.log('No se esta realizando un comparativo de fechas correcto');
    }
  };

  const isSessionValid = () => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if(!token) return false;
    if(Date.now < token.expiredIn) {
      store.dispatch(sessionTimeout());
    }
  }

  return {
    checkSession,
    isSessionValid,
  };
};

export default useVerifySession;
