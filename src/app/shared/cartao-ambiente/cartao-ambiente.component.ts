import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { AmbienteService } from '../../core/services/ambiente.service';
import { Ambiente } from '../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';
import { ConfirmacaoComponent } from '../dialog/confirmacao/confirmacao.component';
import { EditarAmbienteComponent } from '../../pages/editar-ambiente/editar-ambiente.component';

@Component({
  selector: 'app-cartao-ambiente',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
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
        if (resposta) this.deletarAmbiente();
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

  abrirDialogEditarAmbiente(): void {
    const dialog = this.dialog.open(EditarAmbienteComponent, 
      {data: {'ambiente' :this.ambiente}});
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          if (resposta) this.ambienteModificado.emit();
        }
      }
    )
  }

   alterarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      this.service.alterarImagemAmbiente(this.ambiente.id, form).subscribe({
        next: () => {
          this.toast.success('Imagem salva com sucesso', 'SUCESSO');
          this.ambienteModificado.emit();
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.mensagens}`, 'ERRO');
        }
      })
    }
  }

}
