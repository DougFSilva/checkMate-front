import { ChecklistCompartimentoResumo } from "./ChecklistCompartimentoResponse";
import { ItemResumo } from "./ItemResponse";

export interface ItemChecklistDetalhado {
    id: number,
    checkListCompartimento: ChecklistCompartimentoResumo,
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
    observacaoEntrada: string,
    observacaoSaida: string,
}