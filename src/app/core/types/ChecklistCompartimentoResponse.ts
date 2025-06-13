import { CompartimentoResumo } from "./CompartimentoResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface ChecklistCompartimentoDetalhado {
    id: number,
    checklistAmbiente: ChecklistCompartimentoDetalhado,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: string,
    executorPreenchimentoSaida: string,
    status: string
}

export interface ChecklistCompartimentoResumo {
    id: number,
    checklistAmbiente: ChecklistCompartimentoDetalhado,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: string,
    executorPreenchimentoSaida: string,
    status: string
}

export interface PaginaChecklistCompartimento {
    content: ChecklistCompartimentoResumo[];
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