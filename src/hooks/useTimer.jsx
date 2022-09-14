import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import timeConstants from '../redux/constants/timeConstants';

const useTimer = () => {
  const dispatch = useDispatch();

  const getTime = () => {
    const t = new Date();
    const dataTime = {
      year: t.getFullYear(),
      month: t.getMonth(),
      day: t.getDate(),
      hour: t.getHours(),
      minute: t.getMinutes(),
      second: t.getSeconds(),
    };
    dispatch({ type: timeConstants.GET_TIME, payload: dataTime });
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    getTime,
  };
};

export default useTimer;
