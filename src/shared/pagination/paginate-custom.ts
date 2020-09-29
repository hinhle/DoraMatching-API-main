import { EntityResults } from '@/commons/entity-results';
import { IPagination } from './paginate.interface';
import { PaginateParams } from './paginate.params';

export function customPaginate<T>({ entities, count }: EntityResults<T>, { route, order, limit, page }: PaginateParams): IPagination<T> {
    const entitiesLength = entities.length;
    const totalPages = Math.ceil(count / entitiesLength);
    return {
        items: entities,
        links: {
            first: `${route}?page=${1}&limit=${limit}&order=${order}`,
            previous: `${page === 1 ? '' : `${route}?page=${page - 1}&limit=${limit}&order=${order}`}`,
            next: `${page === totalPages ? '' : `${route}?page=${page + 1}&limit=${limit}&order=${order}`}`,
            last: `${route}?page=${totalPages}&limit=${limit}&order=${order}`
        },
        meta: {
            totalItems: count,
            itemCount: entitiesLength,
            itemsPerPage: entitiesLength,
            totalPages,
            currentPage: page
        }
    }
}