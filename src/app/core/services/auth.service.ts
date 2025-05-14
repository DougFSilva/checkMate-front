import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { TokenResponse } from '../types/TokenResponse';
import { LoginForm } from '../types/LoginForm';
import { UsuarioAutenticado } from '../types/UsuarioAutenticado';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const statusAutenticacaoInicial: UsuarioAutenticado = {
  nome: '',
  email: '',
  perfil: '',
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
      {observe: 'response'}).pipe(
        tap ((response) => {
          const token = response.body?.token || '';
          this.setUsuarioAutenticado(token);
        })
      );
  }

   logout() {
    this.limparUsuarioAutenticado();
    this.router.navigate(['login'])
  }

  setUsuarioAutenticado(token: string) {
    this.tokenService.salvarToken(token);
    const usuarioAutenticado: UsuarioAutenticado = this.tokenService.getUsuarioAutenticado();
    try {
      this.statusAutenticacao$.next(usuarioAutenticado);
    } catch (error) {
      console.error('Erro ao decodificar o token: ', error)
      this.limparUsuarioAutenticado();
    }
  }

  limparUsuarioAutenticado() {
    this.statusAutenticacao$.next(statusAutenticacaoInicial);
    this.tokenService.excluirToken();
  }

}
