import { AmbienteResumo } from "./AmbienteResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface CompartimentoDetalhado   {
    id: number,
    ambiente: AmbienteResumo,
    codigo: string,
    nome: string,
    descricao: string,
    imagem: string,
    contagemItens: number
}

export interface CompartimentoResumo   {
    id: number,
    codigo: string,
    nome: string,
    descricao: string,
    imagem: string,
    contagemItens: number
}

export interface PaginaCompartimentos {
    content: CompartimentoResumo[];
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