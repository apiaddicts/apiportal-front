/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { sessionTimeout } from '../redux/actions/userAction';

const useVerifySession = () => {
  const { time } = useSelector((state) => state.timer);

  const getTimeSessionToken = () => {
    const rawToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!rawToken) return null;

    const parsed = JSON.parse(rawToken);
    return new Date(parsed.expiresIn); // ya está en timestamp ms
  };

  const getCurrentTime = () => {
    const currentDate = new Date(
      Date(time.year, time.month, time.day, time.hour, time.minute, time.second)
    );
    return currentDate;
  };

  const checkSession = () => {
    const tokenTime = getTimeSessionToken();
    const currentDate = getCurrentTime();
    if (!tokenTime || !currentDate) return;

    if (tokenTime < currentDate) {
      store.dispatch(sessionTimeout());
    }
  };

  const isSessionValid = () => {
    const raw = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!raw) return false;
    const token = JSON.parse(raw);
    if (Date.now() > token.expiresIn) {
      store.dispatch(sessionTimeout());
      return false;
    }
    return true;
  };

  return {
    checkSession,
    isSessionValid,
  };
};

export default useVerifySession;
