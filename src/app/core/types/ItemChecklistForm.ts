export interface ItemChecklistForm {
    id: number,
    status: ItemChecklistStatus,
    observacao: string
}

export enum ItemChecklistStatus {
    NAO_VERIFICADO, OK, DESVIADO, EMPRESTADO, AVARIADO
}