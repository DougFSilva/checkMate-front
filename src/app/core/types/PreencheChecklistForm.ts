import { ItemChecklistForm } from "./ItemChecklistForm";

export interface PreencheCheckistForm {
    checkListCompartimentoID: number,
    itens: ItemChecklistForm[],
    observacao: string
}