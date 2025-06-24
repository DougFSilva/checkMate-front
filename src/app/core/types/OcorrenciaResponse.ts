import { ItemChecklistDetalhado, ItemChecklistResumo } from "./ItemChecklistResponse";
import { Ordenacao } from "./Ordenacao";
import { Paginacao } from "./Paginacao";
import { UsuarioResumo } from "./UsuarioResponse";

export interface OcorrenciaDetalhado {
    id: number,
    dataHora: Date,
    emissor: string,
    itemCheckList: ItemChecklistDetalhado,
    responsavelEncerramento: UsuarioResumo,
    tratamento: TratatamentoOcorrencia[],
    encerrada: boolean
}

export interface OcorrenciaResumo {
    id: number,
    dataHora: Date,
    emissor: string,
    ambiente: string,
    compartimento: string,
    itemCheckList: ItemChecklistResumo,
    responsavelEncerramento: UsuarioResumo,
    tratamento: TratatamentoOcorrencia[],
    encerrada: boolean
}

export interface PaginaOcorrencias {
    content: OcorrenciaResumo[];
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

export interface TratatamentoOcorrencia {
    id: number,
    autor: UsuarioResumo,
    descricao: string
}