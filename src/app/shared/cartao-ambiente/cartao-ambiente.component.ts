import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Ambiente } from '../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AmbienteService } from '../../core/services/ambiente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoComponent } from '../dialog/confirmacao/confirmacao.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cartao-ambiente',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './cartao-ambiente.component.html',
  styleUrl: './cartao-ambiente.component.css'
})
export class CartaoAmbienteComponent {

  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  @Input() ambiente!: Ambiente;
  @Output() ambienteModificado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl;

  abrirConfirmacaoDelecao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      {
        data: {
          texto: `Deseja realmente excluir o ambiente ${this.ambiente.nome} ?`
        }
      }
    );
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta === 'true') {
          this.deletarAmbiente();
        }
      }
    })
  }

  deletarAmbiente(): void {
    this.service.deletarAmbiente(this.ambiente.id).subscribe(
      {
        next: () => {
          this.toast.success('Ambiente deletado com sucesso', 'SUCESSO');
          this.ambienteModificado.emit();
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao deletar ambiente: ${err.error.mensagens}`)
        }
      }
    )
  }

}
