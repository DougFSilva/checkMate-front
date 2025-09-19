import { CheckListAmbienteResumo } from "./CheckListAmbienteResponse";
import { CompartimentoResumo } from "./CompartimentoResponse";

export interface ChecklistCompartimentoDetalhado {
    id: number,
    checkListAmbiente: CheckListAmbienteResumo,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: string,
    executorPreenchimentoSaida: string,
    status: string
}

export interface ChecklistCompartimentoResumo {
    id: number,
    compartimento: CompartimentoResumo,
    dataHoraPreenchimentoEntrada: Date,
    dataHoraPreenchimentoSaida: Date,
    executorPreenchimentoEntrada: string,
    executorPreenchimentoSaida: string,
    status: string
}
