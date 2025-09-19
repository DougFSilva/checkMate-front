import { AmbienteResumo } from "./AmbienteResponse";
import { UsuarioResponse } from "./UsuarioResponse";

export interface CheckListAmbienteDetalhado {
    id: number,
    ambiente: AmbienteResumo,
    dataHoraAbertura: Date,
    dataHoraLiberacao: Date,
    dataHoraEncerramento: Date,
    responsavelAbertura: UsuarioResponse,
    responsavelLiberacao: UsuarioResponse,
    responsavelEncerramento: UsuarioResponse,
    status: string
}

export interface CheckListAmbienteResumo {
    id: number,
    ambiente: AmbienteResumo,
    dataHoraAbertura: Date,
    dataHoraLiberacao: Date,
    dataHoraEncerramento: Date,
    status: string
}