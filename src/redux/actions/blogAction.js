import blogConstants from '../constants/blogConstants';
import blogService from '../../services/blogService';

// eslint-disable-next-line import/prefer-default-export
export const getBlogs = () => (dispatch) => {
  blogService.getBlogs().then(
    (response) => {
      dispatch({
        type: blogConstants.GET_ALL_BLOG_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: blogConstants.GET_ALL_BLOG_FAILURE,
        payload: error,
      });
    },
  );
};

export const getBlog = (id) => (dispatch) => {
  blogService.getBlog(id).then(
    (response) => {
      dispatch({
        type: blogConstants.GET_BLOG_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: blogConstants.GET_BLOG_FAILURE,
        payload: error,
      });
    },
  );
};

export const getBlogData = () => (dispatch) => {
  blogService.getPageBlog().then(
    (response) => {
      dispatch({
        type: blogConstants.GET_BLOG_DATA_ALL_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: blogConstants.GET_BLOG_DATA_ALL_FAILURE,
        payload: error,
      });
    },
  );
};

export const resetGetBlog = () => (dispatch) => {
  dispatch({
    type: blogConstants.RESET_BLOG,
  });
};

