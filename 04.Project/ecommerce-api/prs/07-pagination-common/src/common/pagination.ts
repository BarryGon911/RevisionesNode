
export interface Page<T> { items: T[]; total: number; page: number; pageSize: number; }
export async function paginate<T>(query: any, countFn: ()=>Promise<number>, page = 1, pageSize = 10): Promise<Page<T>> {
  const [items, total] = await Promise.all([
    query.skip((page-1)*pageSize).limit(pageSize),
    countFn(),
  ]);
  return { items, total, page, pageSize };
}
