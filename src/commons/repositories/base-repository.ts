import { CommonPaginatedResponse } from "../interfaces/common-query.interfaces";

export abstract class BaseRepository<T> {
  paginate( items: T[], page: number, limit: number ): CommonPaginatedResponse<T> {
    const offset = (page - 1) * limit;
    const paginatedItems = items.slice(offset, offset + limit);
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / limit);

    const response = {
      items: paginatedItems,
      page,
      limit,
      totalItems,
      totalPages
    };

    return response;
  };

  filter( items: T[], criteria: Partial<T> ): T[] {
    return items.filter(item =>
      Object.entries(criteria).every(
        ([key, value]) => item[key] === value
      )
    );
  };

  sort( items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc' ): T[] {
    return items.sort((a, b) => {
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      return 0;
    });
  };
};