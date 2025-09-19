import { ChecklistCompartimentoDetalhado } from "./ChecklistCompartimentoResponse";
import { ItemResumo } from "./ItemResponse";

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