export interface UsuarioAutenticado {
    nome: string,
    email: string,
    perfil: string,
    senhaAlterada: boolean,
    exp: number,
    iat: number
}