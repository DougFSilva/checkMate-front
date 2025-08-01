import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface AmbienteDetalhado {
    id: number,
    nome: string,
    descricao: string,
    localizacao: string,
    imagem: string,
    contagemCompartimentos: number,
    contagemItens: number
}

export interface AmbienteResumo {
    id: number,
    nome: string,
    descricao: string,
    localizacao: string,
    imagem: string,
}

export interface PaginaAmbientes {
    content: AmbienteResumo[];
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