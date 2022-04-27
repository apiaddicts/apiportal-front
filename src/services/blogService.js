import handleResponse from './handleResponse';
import config from './config';

function getPageBlog() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${config.apiUrl}/pages/86`, requestOptions)
    .then(handleResponse)
    .then((dataBlog) => {
      return dataBlog;
    });
}

function getBlogs() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/sura-blog-items/`, requestOptions)
    .then(handleResponse)
    .then((blogs) => {
      return blogs;
    });
}

function getBlog(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/sura-blog-items/${id}`, requestOptions)
    .then(handleResponse)
    .then((blog) => {
      return blog;
    });
}

const blogService = {
  getBlogs,
  getBlog,
  getPageBlog,
};

export default blogService;
