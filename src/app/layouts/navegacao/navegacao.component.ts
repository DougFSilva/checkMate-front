import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';

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
export class NavegacaoComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;
  modoSidenav: 'side' | 'over' | 'push' = 'side';
  sidenavAberto = true;
  ocorrenciasAbertas: number = 0;
  private PIXEL_BREAKPOINT = 768;
  private ocorrenciaService = inject(OcorrenciaService);
  private toast = inject(ToastrService);

  constructor() {
    this.ocorrenciaService.atualizarStatusOcorrencias$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.buscarOcorrenciasAbertas(); 
      });
  }

  ngOnInit(): void {
    this.atualizarPropriedadesSidenav();
    this.buscarOcorrenciasAbertas();
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
