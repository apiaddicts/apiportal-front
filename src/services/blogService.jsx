import handleResponse from './handleResponse';
import config from './config';

function getPageBlog() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.blogPageSlug}&populate[contentSections][populate]=*`, requestOptions)
    .then(handleResponse)
    .then((dataBlog) => {
      return dataBlog.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

function getBlogs() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/blog-items?populate=*`, requestOptions)
    .then(handleResponse)
    .then((blogs) => {
      return blogs.data;
    }).catch((error) => {
      console.error(error);
    });
}

function getBlog(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/blog-items/${id}`, requestOptions)
    .then(handleResponse)
    .then((blog) => {
      return blog.data;
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
