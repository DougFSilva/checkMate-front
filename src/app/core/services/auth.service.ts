import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { API_CONFIG } from '../../config/API_CONFIG';
import { TokenResponse } from '../types/TokenResponse';
import { LoginForm } from '../types/LoginForm';
import { UsuarioAutenticado } from '../types/UsuarioAutenticado';
import { TokenService } from './token.service';

const statusAutenticacaoInicial: UsuarioAutenticado = {
  nome: '',
  email: '',
  perfil: '',
  senhaAlterada: false,
  exp: 0,
  iat: 0
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private statusAutenticacao$ = new BehaviorSubject<UsuarioAutenticado>(statusAutenticacaoInicial);
  readonly statusAutenticacao = this.statusAutenticacao$.asObservable();

  autenticar(form: LoginForm): Observable<HttpResponse<TokenResponse>> {
    return this.http.post<TokenResponse>(`${API_CONFIG.baseUrl}/auth`,
      form,
      { observe: 'response' }).pipe(
        tap((response) => {
          const token = response.body?.token || '';
          this.setUsuarioAutenticado(token);
        })
      );
  }

  logout(): void {
    this.limparUsuarioAutenticado();
    this.router.navigate(['login'])
  }

  setUsuarioAutenticado(token: string): void {
    this.tokenService.salvarToken(token);
    const usuarioAutenticado: UsuarioAutenticado = this.getUsuarioAutenticado();
    console.log(usuarioAutenticado);
    try {
      this.statusAutenticacao$.next(usuarioAutenticado);
    } catch (error) {
      console.error('Erro ao decodificar o token: ', error)
      this.limparUsuarioAutenticado();
    }
  }

  limparUsuarioAutenticado(): void {
    this.statusAutenticacao$.next(statusAutenticacaoInicial);
    this.tokenService.excluirToken();
  }


  getUsuarioAutenticado(): UsuarioAutenticado {
    return {
      nome: this.tokenService.getNome(),
      email: this.tokenService.getEmail(),
      perfil: this.tokenService.getPerfil(),
      senhaAlterada: this.tokenService.getSenhaAlterada(),
      exp: this.tokenService.getExp(),
      iat: this.tokenService.getIat()
    }
  }

}
