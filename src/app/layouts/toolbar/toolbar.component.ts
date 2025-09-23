import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioAutenticado } from '../../core/types/UsuarioAutenticado';


@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  usuario: Partial<UsuarioAutenticado> = {};
  private authService = inject(AuthService)
  @Output() botaoSidenav = new EventEmitter<void>();
  
  comandarSidenav() {
    this.botaoSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioAutenticado();
  }

}

