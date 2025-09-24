import { inject, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Stomp, StompHeaders } from '@stomp/stompjs';
import { API_CONFIG } from '../../config/API_CONFIG';
import { TokenService } from './token.service';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any;
  private baseUrl = API_CONFIG.baseUrl;
  private tokenService = inject(TokenService);

  private checklistAmbienteSubject = new Subject<any>();
  private checklistCompartimentoSubject = new Subject<any>();
  private ocorrenciaSubject = new Subject<any>();
  private emprestimoSubject = new Subject<any>();

  public checklistAmbiente$ = this.checklistAmbienteSubject.asObservable();
  public checklistCompartimento$ = this.checklistCompartimentoSubject.asObservable();
  public ocorrencia$ = this.ocorrenciaSubject.asObservable();
  public emprestimo$ = this.emprestimoSubject.asObservable();

  public conectar(): Observable<void> {
    if (this.stompClient && this.stompClient.connected) {
      return of(undefined);
    }
    return new Observable(observer => {
      const wsUrl = `${this.baseUrl}/ws`;
      const headers: StompHeaders = {
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      };
      const socket = new SockJS(wsUrl);
      this.stompClient = Stomp.over(() => socket);

      this.stompClient.connect(headers, (frame: any) => {
        this.stompClient.subscribe('/topic/checklistsambiente', (mensagem: any) => {
          this.checklistAmbienteSubject.next(mensagem);
        });
        this.stompClient.subscribe('/topic/checklistscompartimento', (mensagem: any) => {
          this.checklistCompartimentoSubject.next(mensagem);
        });
        this.stompClient.subscribe('/topic/ocorrencias', (mensagem: any) => {
          this.ocorrenciaSubject.next(mensagem);
        });
        this.stompClient.subscribe('/topic/emprestimos', (mensagem: any) => {
          this.emprestimoSubject.next(mensagem);
        });

        observer.next();
        observer.complete();
        console.log('Conectado ao WebSocket:', frame);
      }, (error: any) => {
        console.error('Erro de WebSocket:', error);
        observer.error(error);
      });
    })
  }

  public desconectar(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }

  public isConectado(): boolean {
    return this.stompClient?.connected ?? false;
  }
}
