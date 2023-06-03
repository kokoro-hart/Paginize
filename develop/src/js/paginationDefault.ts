import { Pagination } from "@kokorotobita/paginize/"

export const paginationDefault = () => {
  new Pagination(".paginize", {
    perPage: 5,
  })
}
