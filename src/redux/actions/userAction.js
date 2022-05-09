import userConstants from '../constants/userConstats';

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => (dispatch) => {
  localStorage.setItem('user', JSON.stringify(data));
  dispatch({
    type: userConstants.SAVE_USER,
    email: data.email,
    password: data.password,
  });
};
