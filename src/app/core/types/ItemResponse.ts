import { CompartimentoResumo } from "./CompartimentoResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface ItemDetalhado   {
    id: number,
    compartimento: CompartimentoResumo,
    descricao: string,
    quantidade: number,
    verificavel: boolean,
    imagem: string
}

export interface ItemResumo   {
    id: number,
    descricao: string,
    quantidade: number,
    verificavel: boolean,
    imagem: string
}

export interface PaginaItens {
    content: ItemResumo[];
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