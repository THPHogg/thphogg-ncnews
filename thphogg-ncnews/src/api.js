import axios from 'axios';

const ncNewsApi = axios.create({
  baseURL: 'https://thphogg-nc-news.herokuapp.com/api',
});

export const getTopics = () => {
  return ncNewsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticles = (sort_by, order, topic) => {
  return ncNewsApi
    .get('/articles', {
      params: {
        sort_by,
        order,
        topic,
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

export const getNewestArticle = () => {
  return axios
    .get(
      'https://thphogg-nc-news.herokuapp.com/api/articles?sort_by=created_at'
    )
    .then(({ data }) => {
      return data.articles[0];
    });
};

export const getTopArticle = () => {
  return axios
    .get('https://thphogg-nc-news.herokuapp.com/api/articles?sort_by=votes')
    .then(({ data }) => {
      return data.articles[0];
    });
};

export const incrementArticleVotes = (article_id, votes) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: votes,
    })
    .then(({ data }) => {
      return data;
    });
};

export const incrementCommentVotes = (comment_id, votes) => {
  return ncNewsApi
    .patch(`/comments/${comment_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data;
    });
};

export const getComments = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
