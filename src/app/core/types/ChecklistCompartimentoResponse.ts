import { CheckListAmbienteResumo } from "./CheckListAmbienteResponse";
import { CompartimentoResumo } from "./CompartimentoResponse";
import { UsuarioResponse } from "./UsuarioResponse";

export interface ChecklistCompartimentoDetalhado {
    id: number,
    checkListAmbiente: CheckListAmbienteResumo,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: UsuarioResponse,
    executorPreenchimentoSaida: UsuarioResponse,
    status: string
}

export interface ChecklistCompartimentoResumo {
    id: number,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: UsuarioResponse,
    executorPreenchimentoSaida: UsuarioResponse,
    status: string
}
