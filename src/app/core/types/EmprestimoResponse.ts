import { ItemResumo } from "./ItemResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";
import { UsuarioResumo } from "./UsuarioResponse";

export interface EmprestimoDetalhado {
    id: number,
    item: ItemResumo,
    emprestador: UsuarioResumo,
    solicitante: UsuarioResumo,
    recebedor: UsuarioResumo,
    dataHoraEmprestimo: Date,
    dataHoraDevolucao: Date,
    devolvido: boolean
}

export interface EmprestimoResumo {
    id: number,
    item: ItemResumo,
    dataHoraEmprestimo: Date,
    dataHoraDevolucao: Date,
    devolvido: boolean
}

export interface PaginaEmprestimosDetalhado {
    content: EmprestimoDetalhado[];
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

export interface PaginaEmprestimosResumo {
    content: EmprestimoResumo[];
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