import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';

import { OcorrenciaService } from '../../../core/services/ocorrencia.service';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { TrataOCorrencia } from '../../../core/types/TrataOcorrenciaForm';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";
import { BotaoCancelarComponent } from "../../botao-cancelar/botao-cancelar.component";

@Component({
  selector: 'app-criar-tratamento-ocorrencia',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent
],
  templateUrl: './criar-tratamento-ocorrencia.component.html',
  styleUrl: './criar-tratamento-ocorrencia.component.css'
})
export class CriarTratamentoOcorrenciaComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CriarTratamentoOcorrenciaComponent>);
  private toast = inject(ToastrService);
  private service = inject(OcorrenciaService);
  ocorrenciaId: number = 0;
  tratamento: TrataOCorrencia = {
    descricao: ''
  }
  formulario = new FormGroup({
    descricao: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    this.ocorrenciaId = this.data.ocorrenciaId;
  }

  abrirDialogConfirmacaoCriarTratamento(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': 'Deseja realmente tratar a ocorrência?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.criarTratamento();
      }
    })
  }

  criarTratamento(): void {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulário', 'INFO');
      return;
    }
    this.tratamento = this.formulario.value as TrataOCorrencia;
    this.service.tratarOCorrencia(this.ocorrenciaId, this.tratamento).subscribe(
      {
        next: () => {
          this.toast.success('Tratamento de ocorrência realizado com sucesso', 'SUCESSO');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.toast.error(`Erro ao tratar a ocorrência: ${err.error.mensagens}`, 'ERRO');
          console.error(err);
         }
      }
    )
  }
}
