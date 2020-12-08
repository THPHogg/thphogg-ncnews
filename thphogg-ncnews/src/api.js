import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://thphogg-nc-news.herokuapp.com/api',
});

export const getTopics = () => {
  return ncNewsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (sort_by, order) => {
  return ncNewsApi
    .get('/articles', {
      params: {
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticle = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
