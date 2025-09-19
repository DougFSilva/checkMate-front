import { AmbienteResumo } from "./AmbienteResponse";

export interface CompartimentoDetalhado   {
    id: number,
    ambiente: AmbienteResumo,
    codigo: string,
    nome: string,
    descricao: string,
    imagem: string,
    contagemItens: number
}

export interface CompartimentoResumo   {
    id: number,
    codigo: string,
    nome: string,
    descricao: string,
    imagem: string,
}
