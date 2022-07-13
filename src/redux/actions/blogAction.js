import blogConstants from '../constants/blogConstants';
import blogService from '../../services/blogService';

import store from '../store';

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

export const filterPosts = (category, title) => (dispatch) => {
  dispatch({
    type: blogConstants.GET_ALL_BLOG_REQUEST,
  });

  const { blogs } = store.getState().blog;

  let categorizedBlogs = (category.toLowerCase().includes('todos')) ? blogs : blogs.filter((blog) => {
    return blog?.tags?.map((tag) => tag?.label?.toLowerCase()).includes(category?.toLowerCase());
  });

  if (title.length > 0) {
    categorizedBlogs = categorizedBlogs.filter((blog) => {
      return blog.title.toLowerCase().includes(title.toLowerCase()) || blog.description.toLowerCase().includes(title.toLowerCase());
    });
  }

  dispatch({
    type: blogConstants.FILTER_BLOGS,
    filteredBlogs: categorizedBlogs,
  });
};
