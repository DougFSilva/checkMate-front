export interface AmbienteDetalhado {
    id: number,
    nome: string,
    descricao: string,
    localizacao: string,
    imagem: string,
    contagemCompartimentos: number,
    contagemItens: number
}

export interface AmbienteResumo {
    id: number,
    nome: string,
    descricao: string,
    localizacao: string,
    imagem: string,
}
