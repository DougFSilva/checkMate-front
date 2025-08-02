import { ChecklistCompartimentoDetalhado } from "./ChecklistCompartimentoResponse";
import { ItemResumo } from "./ItemResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";

export interface ItemChecklistDetalhado {
    id: number,
    checkListCompartimento: ChecklistCompartimentoDetalhado,
    item: ItemResumo,
    statusEntrada: string,
    statusSaida: string,
    observacaoEntrada: string,
    observacaoSaida: string,
}

export interface ItemChecklistResumo {
    id: number,
    item: ItemResumo,
    statusEntrada: string,
    statusSaida: string,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    observacaoEntrada: string,
    observacaoSaida: string,
}

export interface PaginaItensChecklist {
    content: ItemChecklistResumo[];
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