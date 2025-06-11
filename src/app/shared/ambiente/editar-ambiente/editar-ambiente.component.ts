import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

import { AmbienteService } from '../../../core/services/ambiente.service';
import { AmbienteForm } from '../../../core/types/AmbienteForm';
import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";

@Component({
  selector: 'app-editar-ambiente',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent,
    BotaoConfirmarComponent
],
  templateUrl: './editar-ambiente.component.html',
  styleUrl: './editar-ambiente.component.css'
})
export class EditarAmbienteComponent implements OnInit {
  
  private data = inject(MAT_DIALOG_DATA);
  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<EditarAmbienteComponent>);
  id!: number;

  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl(),
    localizacao: new FormControl('', Validators.required)
  });

  ambienteForm: AmbienteForm = {
    nome: '',
    descricao: '',
    localizacao: ''
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.buscarAmbientePeloID();
  }

  buscarAmbientePeloID(): void {
    this.service.buscarAmbientePeloId(this.id).subscribe( 
      {
        next: (resposta) => {
          this.formulario.patchValue({ 'nome' : resposta.nome});
          this.formulario.patchValue({ 'descricao' : resposta.descricao});
          this.formulario.patchValue({ 'localizacao' : resposta.localizacao});
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao buscar ambiente: ${err.error.mensagens}`, 'ERRO')
        }
      }
    )
  }

  abrirConfirmacaoEdicao(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente editar o ambiente?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.editarAmbiente();
      }
    }
    )
  }

  editarAmbiente(): void {
    this.ambienteForm = this.formulario.value as  AmbienteForm;
    this.service.editarAmbiente(this.id, this.ambienteForm).subscribe(
      {
        next: () => {
          this.toast.success('Ambiente editado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao editar ambiente: ${err.error.mensagens}`, 'SUCESSO');
        }
      }
    )
  }
}
