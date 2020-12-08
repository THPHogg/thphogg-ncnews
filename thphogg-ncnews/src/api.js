import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://thphogg-nc-news.herokuapp.com/api',
});

export const getTopics = () => {
  return ncNewsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = () => {
  return ncNewsApi.get('/articles').then(({ data }) => {
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
    return data.article;
  });
};