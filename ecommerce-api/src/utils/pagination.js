export function paginateQuery(query, { page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;
  return { skip, limit };
}

export function buildPaginatedResult({ data, total, page, limit }) {
  const pages = Math.ceil(total / limit) || 1;
  return { total, page, pages, data };
}