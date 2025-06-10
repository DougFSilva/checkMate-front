import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { AmbienteService } from '../../../core/services/ambiente.service';
import { EditarAmbienteComponent } from '../editar-ambiente/editar-ambiente.component';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { AmbienteResumo } from '../../../core/types/AmbienteResponse';

@Component({
  selector: 'app-menu-operacoes-ambiente',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './menu-operacoes-ambiente.component.html',
  styleUrl: './menu-operacoes-ambiente.component.css'
})
export class MenuOperacoesAmbienteComponent {

  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
  @Input() ambiente!: AmbienteResumo;

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
            this.ambienteDeletado.emit();
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
        {data: {'id' :this.ambiente.id}});
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
