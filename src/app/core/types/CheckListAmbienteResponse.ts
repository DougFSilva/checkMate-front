import { AmbienteResumo } from "./AmbienteResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";
import { UsuarioResumo } from "./UsuarioResponse";

export interface ChecklistAmbienteDetalhado {
    id: number,
    ambiente: AmbienteResumo,
    dataHoraAbertura: Date,
    dataHoraLiberacao: Date,
    dataHoraEncerramento: Date,
    responsavelAbertura: UsuarioResumo,
    responsavelLiberacao: UsuarioResumo,
    responsavelEncerramento: UsuarioResumo,
    status: string
}

export interface ChecklistAmbienteResumo {
    id: number,
    ambiente: AmbienteResumo,
    dataHoraAbertura: Date,
    dataHoraLiberacao: Date,
    dataHoraEncerramento: Date,
    status: string
}

export interface PaginaChecklistAmbiente {
    content: ChecklistAmbienteResumo[];
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