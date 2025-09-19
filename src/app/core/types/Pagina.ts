import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface Pagina<T> {
  content: T[];
  pageable: Paginacao;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Ordenacao;
  empty: boolean;
}