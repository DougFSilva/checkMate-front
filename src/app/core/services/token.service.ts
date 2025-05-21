import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  excluirToken(): void {
    localStorage.removeItem(KEY);
  }

  getToken() : string{
    return localStorage.getItem(KEY) ?? '';
  }

  getTokenDecodificado(): any {
      const token = this.getToken();
      if (token) {
        try {
          return jwtDecode(token);
        } catch (Error) {
          return null;
        }
      }
      return null;
    }

    getNome(): string {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.nome : '';
    }

    getEmail(): string {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.sub : '';
    }

    getPerfil(): string {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.perfil : '';
    }

    getExp(): number {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.exp : 0;
    }

    getIat(): number {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.iat : 0;
    }

    getSenhaAlterada(): boolean {
      const tokenDecodificado = this.getTokenDecodificado();
      return tokenDecodificado? tokenDecodificado.senhaAlterada : false;
    }

}
