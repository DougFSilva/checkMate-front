import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { WebsocketService } from '../../core/services/websocket.service';
import { filter, Subscription } from 'rxjs'

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
import { FooterComponent } from "./components/footer/footer.component";
import { ListaLinksComponent } from "./components/lista-links/lista-links.component";

@Component({
  selector: 'app-navegacao',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    ToolbarComponent,
    RouterModule,
    MatDividerModule,
    FooterComponent,
    ListaLinksComponent
  ],
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('drawerContainer') drawerContainer!: MatDrawerContainer;
  @ViewChild('drawer') drawer!: MatDrawer;

  private routerSubscription!: Subscription;
  private router = inject(Router);
  public modoSidenav: 'side' | 'over' | 'push' = 'side';
  public sidenavAberto = true;
  public ocorrenciasAbertas: number = 0;
  public PIXEL_BREAKPOINT = 1000;
  private toast = inject(ToastrService);
  private ocorrenciaService = inject(OcorrenciaService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.atualizarPropriedadesSidenav();
    this.buscarOcorrenciasAbertas();
    this.inscreverWs();
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.drawerContainer.scrollable.scrollTo({ top: 0, left: 0 });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.ocorrencia$.subscribe({
      next: (resposta) => {
        if (
            resposta.body === 'OCORRENCIA_ABERTA' 
            || resposta.body === 'OCORRENCIA_ENCERRADA'
            || resposta.body === 'OCORRENCIA_DELETADA'
          ) {
          this.buscarOcorrenciasAbertas();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico ocorrências. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.atualizarPropriedadesSidenav();
  }

  buscarOcorrenciasAbertas(): void {
    this.ocorrenciaService.buscarOcorrenciasPeloStatusEncerrada(false, 0, 50).subscribe(
      {
        next: (response) => {
          console.log(response)
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
