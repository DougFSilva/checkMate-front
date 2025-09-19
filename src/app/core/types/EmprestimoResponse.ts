import { ItemResumo } from "./ItemResponse";
import { UsuarioResponse } from "./UsuarioResponse";

export interface EmprestimoDetalhado {
    id: number,
    item: ItemResumo,
    emprestador: UsuarioResponse,
    solicitante: UsuarioResponse,
    recebedor: UsuarioResponse,
    dataHoraEmprestimo: Date,
    dataHoraDevolucao: Date,
    devolvido: boolean
}

export interface EmprestimoResumo {
    id: number,
    item: ItemResumo,
    dataHoraEmprestimo: Date,
    dataHoraDevolucao: Date,
    devolvido: boolean
}