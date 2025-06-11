import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { CompartimentoService } from '../../../core/services/compartimento.service';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { ItemService } from '../../../core/services/item.service';
import { CompartimentoResumo } from '../../../core/types/CompartimentoResponse';
import { ItemForm } from '../../../core/types/ItemForm';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";

@Component({
  selector: 'app-criar-item',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoCancelarComponent,
    MatSelectModule,
    MatCheckboxModule,
    BotaoConfirmarComponent
],
  templateUrl: './criar-item.component.html',
  styleUrl: './criar-item.component.css'
})
export class CriarItemComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private compartimentoService = inject(CompartimentoService);
  private itemService = inject(ItemService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CriarItemComponent>);
  compartimentos: CompartimentoResumo[] = [];
  
  formulario = new FormGroup({
    compartimentoID: new FormControl(0, Validators.required),
    descricao: new FormControl('', Validators.required),
    quantidade: new FormControl(0, Validators.required),
    verificavel: new FormControl(true, Validators.required)
  });

  itemForm: ItemForm = {
    compartimentoID: 0,
    descricao: '',
    quantidade: 0, 
    verificavel: true
  }

  ngOnInit(): void {
    if (this.data?.id != null) {
      this.formulario.patchValue({'compartimentoID': this.data.id});
    }
    this.buscarTodosCompartimentos();
  }

  abrirConfirmacaoCriacao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente criar o item?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.criarItem();
      }
    } 
    )
  }

  criarItem(): void {
    this.itemForm = this.formulario.value as ItemForm;
    this.itemService.criarItem(this.itemForm).subscribe(
      {
        next: () => {
          this.toast.success('Item criado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao criar Item: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  buscarTodosCompartimentos(): void {
    this.compartimentoService.buscarTodosCompartimentos(0, 1000000).subscribe(
      {
        next: (resposta) => {
          this.compartimentos = resposta.content;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar compartimentos: ${err.error.mensagens}`);
        }
      }
    )
  }

}
