export interface CommonPaginatedResponse<T> {
  items:              Array<T>;
  limit:              number;
  page:               number;
  totalItems:         number;
  totalPages:         number;
};