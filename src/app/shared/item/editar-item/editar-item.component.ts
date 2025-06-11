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
import { BotaoConfirmarComponent } from '../../botao-confirmar/botao-confirmar.component';

@Component({
  selector: 'app-editar-item',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './editar-item.component.html',
  styleUrl: './editar-item.component.css'
})
export class EditarItemComponent implements OnInit {
  
  private data = inject(MAT_DIALOG_DATA);
  private compartimentoService = inject(CompartimentoService);
  private itemService = inject(ItemService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<EditarItemComponent>);
  id!: number;
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
    this.id = this.data.id;
    this.buscarItemPeloID();
    this.buscarTodosCompartimentos();
  }

  buscarItemPeloID(): void {
    this.itemService.buscarItemPeloID(this.id).subscribe( 
      {
        next: (resposta) => {
          this.formulario.patchValue({ 'compartimentoID' : resposta.compartimento.id});
          this.formulario.patchValue({ 'descricao' : resposta.descricao});
          this.formulario.patchValue({ 'quantidade' : resposta.quantidade});
          this.formulario.patchValue({ 'verificavel' : resposta.verificavel})
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar item: ${err.error.mensagens}`)
        }
      }
    )
  }

  abrirConfirmacaoEdicao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente editar o item?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.editarItem();
      }
    } 
    )
  }

  editarItem(): void {
    this.itemForm = this.formulario.value as ItemForm;
    this.itemService.editarItem(this.id, this.itemForm).subscribe(
      {
        next: () => {
          this.toast.success('Item editado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao editar item: ${err.error.mensagens}`, 'ERRO');
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

