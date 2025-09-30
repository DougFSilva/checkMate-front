import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoComponent } from '../../../../shared/dialog/confirmacao/confirmacao.component';
import { UsuarioResponse } from '../../../../core/types/UsuarioResponse';

@Component({
  selector: 'app-lista-links',
  imports: [
    MatIconModule,
    MatBadgeModule,
    RouterModule,
  ],
  templateUrl: './lista-links.component.html',
  styleUrl: './lista-links.component.css'
})
export class ListaLinksComponent implements OnInit {

  @Output() fecharSideNavSeModoOver = new EventEmitter<void>();
  @Input() ocorrenciasAbertas!: number;
  private authService = inject(AuthService)
  private dialog = inject(MatDialog);
  usuarioAutenticado: Partial<UsuarioResponse> = {};

  ngOnInit(): void {
    this.usuarioAutenticado = this.authService.getUsuarioAutenticado();
  }

  logout() {
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente efetuar o logout?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.authService.logout();
      }
    })
  }
}
