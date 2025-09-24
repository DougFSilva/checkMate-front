import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

import { UsuarioService } from '../../../core/services/usuario.service';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";
import { BotaoCancelarComponent } from "../../botao-cancelar/botao-cancelar.component";
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { ItemDetalhado } from '../../../core/types/ItemResponse';
import { EmprestimoForm } from '../../../core/types/EmprestimoForm';
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { Pagina } from '../../../core/types/Pagina';
import { UsuarioResponse } from '../../../core/types/UsuarioResponse';

@Component({
  selector: 'app-emprestar-item',
  imports: [
    MatSelectModule, 
    BotaoConfirmarComponent, 
    BotaoCancelarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './emprestar-item.component.html',
  styleUrl: './emprestar-item.component.css'
})
export class EmprestarItemComponent implements OnInit {

  private service = inject(EmprestimoService);
  private usuarioService = inject(UsuarioService);
  private toast = inject(ToastrService);
  private data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<EmprestarItemComponent>);
  private dialog = inject(MatDialog);
  item: Partial<ItemDetalhado> = {};

  usuarios: Partial<Pagina<UsuarioResponse>> = {};

  usuario = new FormControl(null, Validators.required);
  formularioEmprestimo: EmprestimoForm = {
    itemID: 0,
    solicitanteID: 0
  }

  ngOnInit(): void {
    this.item = this.data.item;
    this.buscarTodosUsuarios();
  }

  buscarTodosUsuarios(): void {
    this.usuarioService.buscarTodosUsuarios(0, 1000000).subscribe({
      next: (resposta) => {
        this.usuarios = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar lista de usuários: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

  abrirConfirmacaoEmprestimo(): void {
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': `Deseja realmente emprestar o item ${this.item.descricao}?` } })
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.emprestarItem();
      }
    })
  }

  emprestarItem(): void {
    if(this.usuario.value == null) {
      this.toast.info('Selecione um solicitante', 'INFO');
      return;
    }
    this.formularioEmprestimo.itemID = this.item.id!;
    this.formularioEmprestimo.solicitanteID = this.usuario.value;
    this.service.emprestarItem(this.formularioEmprestimo).subscribe({
      next: () => {
        this.toast.success('Item emprestado com sucesso', 'SUCESSO');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(`Erro ao emprestar item: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

}
