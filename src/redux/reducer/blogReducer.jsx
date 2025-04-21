import blogConstants from '../constants/blogConstants';

const initialState = {
  // Data page blogs
  blogPage: {},
  error: {},
  // Blogs constants
  blogs: [],
  filteredBlogs: [],
  filters: [],
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
        filteredBlogs: action.payload,
        errorBlogs: {},
      };
    case blogConstants.GET_ALL_BLOG_FAILURE:
      return {
        ...state,
        blogs: [],
        errorBlogs: action.payload,
      };
    case blogConstants.FILTER_BLOGS:
      return {
        ...state,
        filteredBlogs: action.filteredBlogs,
      };
    // Assignment of the load value of blog
    case blogConstants.GET_BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload,
        errorBlog: {},
      };
    case blogConstants.GET_BLOG_FAILURE:
      return {
        ...state,
        blog: {},
        errorBlog: action.payload,
      };
    // Assignment of the load blogPage to page blog
    case blogConstants.GET_BLOG_DATA_ALL_SUCCESS:
      return {
        ...state,
        blogPage: action.payload,
        error: {},
      };
    case blogConstants.GET_BLOG_DATA_ALL_FAILURE:
      return {
        ...state,
        blogPage: {},
        error: action.payload,
      };
    // Reset blogPage of the blog
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
