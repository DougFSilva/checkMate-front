import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacao',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    RouterModule
  ],
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;
  modoSidenav: 'side' | 'over' | 'push' = 'side';
  sidenavAberto = true;
  private readonly PIXEL_BREAKPOINT = 768;

  constructor() { }

  ngOnInit(): void {
    this.atualizarPropriedadesSidenav();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.atualizarPropriedadesSidenav();
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
