import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface UsuarioDetalhado {
    id: number,
    nome: string,
    CPF: string,
    email: string,
    senhaAlterada: boolean,
    perfil: string
}

export interface UsuarioResumo {
    id: number,
    nome: string,
    email: string,
    perfil: string
}

export interface PaginaUsuarios {
    content: UsuarioResumo[];
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