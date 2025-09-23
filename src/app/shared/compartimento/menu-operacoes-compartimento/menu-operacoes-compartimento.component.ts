import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { CompartimentoService } from '../../../core/services/compartimento.service';
import { CompartimentoResumo } from '../../../core/types/CompartimentoResponse';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { EditarCompartimentoComponent } from '../editar-compartimento/editar-compartimento.component';

@Component({
  selector: 'app-menu-operacoes-compartimento',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './menu-operacoes-compartimento.component.html',
  styleUrl: './menu-operacoes-compartimento.component.css'
})
export class MenuOperacoesCompartimentoComponent {

  private service = inject(CompartimentoService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  @Output() compartimentoModificado = new EventEmitter<void>();
  @Output() compartimentoDeletado = new EventEmitter<void>();
  @Input() compartimento: Partial<CompartimentoResumo> = {};

   abrirConfirmacaoDelecao(): void {
      const dialog = this.dialog.open(ConfirmacaoComponent,
        {
          data: {
            texto: `Deseja realmente excluir o compartimento ${this.compartimento.nome}?`
          }
        }
      );
      dialog.afterClosed().subscribe({
        next: (resposta) => {
          if (resposta) this.deletarCompartimento();
        }
      })
    }

   deletarCompartimento(): void {
      this.service.deletarCompartimento(this.compartimento.id!).subscribe(
        {
          next: () => {
            this.toast.success('Compartimento deletado com sucesso', 'SUCESSO');
            this.compartimentoDeletado.emit();
          },
          error: (err) => {
            console.error(err.error);
            this.toast.error(`Erro ao deletar compartimento: ${err.error.mensagens}`)
          }
        }
      )
    }
  
    abrirDialogEditarAmbiente(): void {
      const dialog = this.dialog.open(EditarCompartimentoComponent, 
        {data: {'id' :this.compartimento.id}});
      dialog.afterClosed().subscribe(
        {
          next: (resposta) => {
            if (resposta) this.compartimentoModificado.emit();
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
        this.service.alterarImagemCompartimento(this.compartimento.id!, form).subscribe({
          next: () => {
            this.toast.success('Imagem salva com sucesso', 'SUCESSO');
            this.compartimentoModificado.emit();
          },
          error: (err) => {
            this.toast.error(`Erro ao salvar imagem: ${err.error.mensagens}`, 'ERRO');
          }
        })
      }
    }
}
