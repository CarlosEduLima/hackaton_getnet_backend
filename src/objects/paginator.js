
    const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: posts } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, posts, totalPages, currentPage };
};
module.exports = {getPagination, getPagingData}