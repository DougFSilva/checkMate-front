import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface UsuarioDetalhado {
    ID: number,
    nome: string,
    CPF: string,
    email: string,
    senhaAlterada: boolean,
    perfil: string
}

export interface UsuarioResumo {
    ID: number,
    nome: string,
    email: string,
    perfil: string
}

export interface PaginaAmbientes {
    content: UsuarioDetalhado[];
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