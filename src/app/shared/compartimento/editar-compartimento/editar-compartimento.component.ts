import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';

import { BotaoAcaoComponent } from '../../botao-acao/botao-acao.component';
import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { CompartimentoService } from '../../../core/services/compartimento.service';
import { CompartimentoForm } from '../../../core/types/CompartimentoForm';
import { AmbienteResumo } from '../../../core/types/AmbienteResponse';
import { AmbienteService } from '../../../core/services/ambiente.service';

@Component({
  selector: 'app-editar-compartimento',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoAcaoComponent,
    BotaoCancelarComponent,
    MatSelectModule
  ],
  templateUrl: './editar-compartimento.component.html',
  styleUrl: './editar-compartimento.component.css'
})
export class EditarCompartimentoComponent implements OnInit {
  
  private data = inject(MAT_DIALOG_DATA);
  private compartimentoService = inject(CompartimentoService);
  private ambienteService = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<EditarCompartimentoComponent>);
  id!: number;
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
    this.id = this.data.id;
    this.buscarAmbientePeloID();
    this.buscarTodosAmbientes();
  }

  buscarAmbientePeloID(): void {
    this.compartimentoService.buscarCompartimentoPeloId(this.id).subscribe( 
      {
        next: (resposta) => {
          this.formulario.patchValue({ 'codigo' : resposta.codigo});
          this.formulario.patchValue({ 'nome' : resposta.nome});
          this.formulario.patchValue({ 'descricao' : resposta.descricao});
          this.formulario.patchValue({ 'ambienteID' : resposta.ambiente.id})
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ambiente: ${err.error.mensagens}`)
        }
      }
    )
  }

  abrirConfirmacaoEdicao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente editar o compartimento?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.editarCompartimento();
      }
    } 
    )
  }

  editarCompartimento(): void {
    this.compartimentoForm = this.formulario.value as CompartimentoForm;
    console.log(this.compartimentoForm)
    this.compartimentoService.editarCompartimento(this.id, this.compartimentoForm).subscribe(
      {
        next: () => {
          this.toast.success('Compartimento editado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao editar ambiente: ${err.error.mensagens}`, 'SUCESSO');
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

