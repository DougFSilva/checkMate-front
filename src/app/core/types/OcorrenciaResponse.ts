import { ItemChecklistDetalhado, ItemChecklistResumo } from "./ItemChecklistResponse";
import { UsuarioResponse } from "./UsuarioResponse";

export interface OcorrenciaDetalhado {
    id: number,
    dataHora: Date,
    emissor: string,
    itemCheckList: ItemChecklistDetalhado,
    responsavelEncerramento: UsuarioResponse,
    tratamento: TratamentoOcorrencia[],
    encerrada: boolean
}

export interface OcorrenciaResumo {
    id: number,
    dataHora: Date,
    emissor: string,
    ambiente: string,
    compartimento: string,
    itemCheckList: ItemChecklistResumo,
    responsavelEncerramento: UsuarioResponse,
    tratamento: TratamentoOcorrencia[],
    encerrada: boolean
}

export interface TratamentoOcorrencia {
    id: number,
    dataHora: Date,
    autor: UsuarioResponse,
    descricao: string
}