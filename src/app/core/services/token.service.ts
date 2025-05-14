import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { UsuarioAutenticado } from '../types/UsuarioAutenticado';

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
      return tokenDecodificado? tokenDecodificado.email : '';
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

    getUsuarioAutenticado(): UsuarioAutenticado {
      return {
        nome: this.getNome(),
        email: this.getEmail(),
        perfil: this.getPerfil(),
        exp: this.getExp(),
        iat: this.getIat()
      }
    }
}
