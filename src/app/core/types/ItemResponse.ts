import { CompartimentoResumo } from "./CompartimentoResponse";

export interface ItemDetalhado   {
    id: number,
    compartimento: CompartimentoResumo,
    descricao: string,
    quantidade: number,
    verificavel: boolean,
    imagem: string
}

export interface ItemResumo   {
    id: number,
    descricao: string,
    quantidade: number,
    verificavel: boolean,
    imagem: string
}
