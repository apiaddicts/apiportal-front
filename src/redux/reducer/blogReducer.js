import blogConstants from '../constants/blogConstants';

const initialState = {
  // Data page blogs
  data: {},
  error: {},
  // Blogs constants
  blogs: [],
  errorBlogs: {},
  loading: false,
  // Blog constant
  blog: {},
  errorBlog: {},
  loadingBlog: false,

};

// eslint-disable-next-line default-param-last
export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    // Assignment of the load value of all blogs
    case blogConstants.GET_ALL_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
      };
    case blogConstants.GET_ALL_BLOG_FAILURE:
      return {
        ...state,
        errorBlogs: action.payload,
      };
    // Assignment of the load value of blog
    case blogConstants.GET_BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload,
      };
    case blogConstants.GET_BLOG_FAILURE:
      return {
        ...state,
        errorBlog: action.payload,
      };
    // Assignment of the load data to page blog
    case blogConstants.GET_BLOG_DATA_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case blogConstants.GET_BLOG_DATA_ALL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // Reset data of the blog
    case blogConstants.RESET_BLOG:
      return {
        ...state,
        blog: {},
        errorBlogs: {},
      };
    default:
      return state;
  }
}
