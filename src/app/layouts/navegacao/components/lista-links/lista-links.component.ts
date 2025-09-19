import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoComponent } from '../../../../shared/dialog/confirmacao/confirmacao.component';

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
export class ListaLinksComponent {

  @Output() fecharSideNavSeModoOver = new EventEmitter<void>();
  @Input() ocorrenciasAbertas!: number;
  private authService = inject(AuthService)
  private dialog = inject(MatDialog);

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
