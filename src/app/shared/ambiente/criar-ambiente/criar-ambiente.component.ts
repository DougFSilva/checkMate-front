import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { BotaoConfirmarComponent } from '../../botao-confirmar/botao-confirmar.component';
import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { AmbienteForm } from '../../../core/types/AmbienteForm';
import { AmbienteService } from '../../../core/services/ambiente.service';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';


@Component({
  selector: 'app-criar-ambiente',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent
  ],
  templateUrl: './criar-ambiente.component.html',
  styleUrl: './criar-ambiente.component.css'
})
export class CriarAmbienteComponent {

  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CriarAmbienteComponent>);
  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl(),
    localizacao: new FormControl('', Validators.required )
  });

  ambienteForm: AmbienteForm = {
    nome: '',
    descricao: '',
    localizacao: ''
  }

  abrirConfirmacaoCriacao(): void {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulario', 'INFO');
      return;
    }
    const dialog = this.dialog.open(ConfirmacaoComponent, 
      {data: {texto: 'Deseja realmente criar o ambiente'}});
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          if(resposta) this.criarAmbiente();
        }
      }
    )
  }

  criarAmbiente(): void {
    this.ambienteForm = this.formulario.value as AmbienteForm;
    this.service.criarAmbiente(this.ambienteForm).subscribe(
      {
        next: () => {
          this.toast.success('Ambiente criado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          this.toast.error(`Erro ao criar ambiente: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }
}
