import handleResponse from './handleResponse';
import config from './config';

function getPageBlog() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  console.log('config.blogPageSlug', config.blogPageSlug);
  console.log(`${config.apiUrl}/pages?_where[slug]=${config.blogPageSlug}&_locale=${config.locale}`);

  return fetch(`${config.apiUrl}/pages?_where[slug]=${config.blogPageSlug}&_locale=${config.locale}`, requestOptions)


    .then(handleResponse)

    .then((dataBlog) => {
      console.log('dataBlog', dataBlog);
      return dataBlog[0];
    }).catch((error) => {
      console.error('Error fetching blog page:', error);
      console.error(error);
    });
}

function getBlogs() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.apiUrl}/blog-items/`, requestOptions)
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

  return fetch(`${config.apiUrl}/blog-items/${id}`, requestOptions)
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
