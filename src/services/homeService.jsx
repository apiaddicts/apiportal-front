import handleResponse from './handleResponse';
import config from './config';

const HOME_QUERY = "populate[contentSections][on][custom.carousel][populate][sliderCarousel][populate]=imgSrc&populate[contentSections][on][home.work-section][populate]=*&populate[contentSections][on][sections.title-section][populate]=*&populate[contentSections][on][home.discover-section][populate]=*&populate[contentSections][on][sections.button-hero][populate]=*&populate[contentSections][on][sections.section-use-case][populate]=*&populate[contentSections][on][custom.tab-card][populate]=*&populate[contentSections][on][home.banner-section][populate]=*"

function getHomeContent() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` },
  };

  return fetch(`${config.apiUrl}/pages?filters[slug][$eq]=${config.homePageSlug}&${HOME_QUERY}`, requestOptions)
    .then(handleResponse)
    .then((home) => {
      return home.data[0];
    }).catch((error) => {
      console.error(error);
    });
}

const homeService = {
  getHomeContent,
};

export default homeService;
