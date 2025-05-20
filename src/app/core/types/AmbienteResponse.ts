import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface Ambiente {
    id: number,
    nome: string,
    descricao: string,
    localizacao: string,
    imagem: string
}

export interface PaginaAmbientes {
    content: Ambiente[];
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