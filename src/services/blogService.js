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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
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
    }).catch((error) => {
      console.error(error);
    });
}

const blogService = {
  getBlogs,
  getBlog,
  getPageBlog,
};

export default blogService;
