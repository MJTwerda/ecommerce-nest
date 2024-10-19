import { FindManyOptions, Repository } from "typeorm";
import { CommonQueryDto } from "../dtos/common-query-dto";
import { CommonPaginatedResponse } from "../interfaces/common-query.interfaces";

export class BaseRepository<T> extends Repository<T> {
  async paginate(
    options: FindManyOptions<T>,
    page: number,
    limit: number
  ): Promise<CommonPaginatedResponse<T>> {
    const [items, totalItems] = await this.findAndCount({
      ...options,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      page,
      limit,
      totalItems,
      totalPages,
    };
  }

  // async paginate(
  //   query: CommonQueryDto
  // ): Promise<CommonPaginatedResponse<T>> {
  //   const page = Number(query.page) || 1;
  //   const limit = Number(query.limit) || 5;
  //   const skip = (page - 1) * limit;

  //   const [items, totalItems] = await this.findAndCount({
  //     skip,
  //     take: limit,
  //   });

  //   const totalPages = Math.ceil(totalItems / limit);

  //   return {
  //     items,
  //     page,
  //     limit,
  //     totalItems,
  //     totalPages,
  //   };
  // }

  // filter( items: T[], criteria: Partial<T> ): T[] {
  //   return items.filter(item =>
  //     Object.entries(criteria).every(
  //       ([key, value]) => item[key] === value
  //     )
  //   );
  // };

  // sort( items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc' ): T[] {
  //   return items.sort((a, b) => {
  //     if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
  //     if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
  //     return 0;
  //   });
  // };
};


//! Sin TYPEORM

// import { CommonPaginatedResponse } from "../interfaces/common-query.interfaces";

// export abstract class BaseRepository<T> {
//   paginate( items: T[], page: number, limit: number ): CommonPaginatedResponse<T> {
//     const offset = (page - 1) * limit;
//     const paginatedItems = items.slice(offset, offset + limit);
//     const totalItems = items.length;
//     const totalPages = Math.ceil(totalItems / limit);

//     const response = {
//       items: paginatedItems,
//       page,
//       limit,
//       totalItems,
//       totalPages
//     };

//     return response;
//   };

//   filter( items: T[], criteria: Partial<T> ): T[] {
//     return items.filter(item =>
//       Object.entries(criteria).every(
//         ([key, value]) => item[key] === value
//       )
//     );
//   };

//   sort( items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc' ): T[] {
//     return items.sort((a, b) => {
//       if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
//       if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
//       return 0;
//     });
//   };
// };