export const getArticleCategories = (axios, slug) => {
  return axios.get(`/article-categories/${slug}`).then(resp => {
    return resp;
  });
};

export const getArticleByTag = (axios, tag) => {
  return axios.get(`/articles/${tag}`).then(resp => {
    return resp;
  });
};
