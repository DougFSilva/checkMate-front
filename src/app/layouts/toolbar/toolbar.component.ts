import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

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

  @Output() botaoSidenav = new EventEmitter<void>();
  @Input() paginaAtiva: string = ''
  
  private authService = inject(AuthService);
  comandarSidenav() {
    this.botaoSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }
}
