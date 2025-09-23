export interface UsuarioResponse {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    senhaAlterada: boolean,
    perfil: string
    dataValidade: Date
}