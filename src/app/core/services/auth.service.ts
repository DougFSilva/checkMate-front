import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { API_CONFIG } from '../../config/API_CONFIG';
import { LoginForm } from '../types/LoginForm';
import { UsuarioAutenticado } from '../types/UsuarioAutenticado';
import { TokenService } from './token.service';
import { AuthResponse } from '../types/AuthResponse';
import { AlteraSenhaComponent } from '../../pages/altera-senha/altera-senha.component';

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
  private baseUrl = API_CONFIG.baseUrl + '/auth';

  autenticar(form: LoginForm): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.baseUrl}`,
      form,
      { observe: 'response' }).pipe(
        tap((response) => {
          if (response.body?.token) {
            const token = response.body.token;
            this.tokenService.salvarToken(token);
          }
        })
      );
  }

  logout(): void {
    this.limparUsuarioAutenticado();
    this.router.navigate(['login'])
  }

  alterarSenha(form: AlteraSenhaComponent): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/alterar-senha`, form);
  }

  limparUsuarioAutenticado(): void {
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
