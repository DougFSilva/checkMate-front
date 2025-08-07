import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs'

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
;

@Component({
  selector: 'app-navegacao',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    RouterModule,
    MatBadgeModule
  ],
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer!: MatDrawer;
  modoSidenav: 'side' | 'over' | 'push' = 'side';
  sidenavAberto = true;
  ocorrenciasAbertas: number = 0;
  private PIXEL_BREAKPOINT = 768;
  private toast = inject(ToastrService);
  private ocorrenciaService = inject(OcorrenciaService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.atualizarPropriedadesSidenav();
    this.buscarOcorrenciasAbertas();
    this.inscreverWs();
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.ocorrencia$.subscribe({
      next: (resposta) => {
        if (resposta.body === 'OCORRENCIA_ABERTA'){
          this.buscarOcorrenciasAbertas();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico ocorrências. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.atualizarPropriedadesSidenav();
  }

  buscarOcorrenciasAbertas(): void {
    this.ocorrenciaService.buscarOcorrenciasPeloStatusEncerrada(false, 0, 50).subscribe(
      {
        next: (response) => {
          this.ocorrenciasAbertas = response.totalElements;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ocorrências abertas: ${err.error.mensagens}`);
        }
      }
    )
  }

  atualizarPropriedadesSidenav(): void {
    const width = window.innerWidth;
    if (width < this.PIXEL_BREAKPOINT) {
      this.modoSidenav = 'over';
      this.sidenavAberto = false;
    } else {
      this.modoSidenav = 'side';
      this.sidenavAberto = true;
    }
  }

  fecharSideNavSeModoOver(): void {
    if (this.modoSidenav === 'over') {
      this.drawer.close();
    }
  }

}
