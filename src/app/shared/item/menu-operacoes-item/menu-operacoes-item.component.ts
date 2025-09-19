import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { ItemService } from '../../../core/services/item.service';
import { ItemResumo } from '../../../core/types/ItemResponse';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EmprestarItemComponent } from '../emprestar-item/emprestar-item.component';

@Component({
  selector: 'app-menu-operacoes-item',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './menu-operacoes-item.component.html',
  styleUrl: './menu-operacoes-item.component.css'
})
export class MenuOperacoesItemComponent {
  private service = inject(ItemService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  @Output() itemModificado = new EventEmitter<void>();
  @Output() itemDeletado = new EventEmitter<void>();
  @Input() item!: ItemResumo;

  abrirConfirmacaoDelecao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      {
        data: {
          texto: `Deseja realmente excluir o item ${this.item.descricao}?`
        }
      }
    );
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.deletarItem();
      }
    })
  }

  deletarItem(): void {
    this.service.deletarItem(this.item.id).subscribe(
      {
        next: () => {
          this.toast.success('Item deletado com sucesso', 'SUCESSO');
          this.itemDeletado.emit();
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao deletar item: ${err.error.mensagens}`)
        }
      }
    )
  }

  abrirDialogEditarItem(): void {
    const dialog = this.dialog.open(EditarItemComponent,
      { data: { 'id': this.item.id } });
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          if (resposta) this.itemModificado.emit();
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
      this.service.alterarImagemItem(this.item.id, form).subscribe({
        next: () => {
          this.toast.success('Imagem salva com sucesso', 'SUCESSO');
          this.itemModificado.emit();
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.mensagens}`, 'ERRO');
        }
      })
    }
  }

  abrirDialogEmprestarItem(): void {
    let dialog = this.dialog.open(EmprestarItemComponent, {data: {'item': this.item}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.itemModificado.emit();
      }
    })
  }

}
