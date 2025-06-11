import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { CompartimentoService } from '../../../core/services/compartimento.service';
import { AmbienteService } from '../../../core/services/ambiente.service';
import { AmbienteResumo } from '../../../core/types/AmbienteResponse';
import { CompartimentoForm } from '../../../core/types/CompartimentoForm';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";

@Component({
  selector: 'app-criar-compartimento',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent,
    MatSelectModule,
    BotaoConfirmarComponent
],
  templateUrl: './criar-compartimento.component.html',
  styleUrl: './criar-compartimento.component.css'
})
export class CriarCompartimentoComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private compartimentoService = inject(CompartimentoService);
  private ambienteService = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CriarCompartimentoComponent>);
  ambientes: AmbienteResumo[] = [];
  
  formulario = new FormGroup({
    ambienteID: new FormControl(0, Validators.required),
    codigo: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl()
  });

  compartimentoForm: CompartimentoForm = {
    ambienteID: 0,
    codigo: '',
    nome: '',
    descricao: ''
  }

  ngOnInit(): void {
    if (this.data?.id != null) {
      this.formulario.patchValue({'ambienteID': this.data.id});
    }
    this.buscarTodosAmbientes();
  }

  abrirConfirmacaoCriacao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente criar o compartimento?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.criarCompartimento();
      }
    } 
    )
  }

  criarCompartimento(): void {
    this.compartimentoForm = this.formulario.value as CompartimentoForm;
    this.compartimentoService.criarCompartimento(this.compartimentoForm).subscribe(
      {
        next: () => {
          this.toast.success('Compartimento criado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao criar compartimento: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  buscarTodosAmbientes(): void {
    this.ambienteService.buscarTodosAmbientes(0, 1000000).subscribe(
      {
        next: (resposta) => {
          this.ambientes = resposta.content;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ambientes: ${err.error.mensagens}`);
        }
      }
    )
  }

}
