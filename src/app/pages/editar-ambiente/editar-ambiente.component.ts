import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

import { AmbienteService } from '../../core/services/ambiente.service';
import { CriarAmbienteComponent } from '../criar-ambiente/criar-ambiente.component';
import { AmbienteForm } from '../../core/types/AmbienteForm';
import { BotaoAcaoComponent } from '../../shared/botao-acao/botao-acao.component';
import { BotaoCancelarComponent } from '../../shared/botao-cancelar/botao-cancelar.component';
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-editar-ambiente',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoAcaoComponent,
    BotaoCancelarComponent
  ],
  templateUrl: './editar-ambiente.component.html',
  styleUrl: './editar-ambiente.component.css'
})
export class EditarAmbienteComponent implements OnInit {

  data: any = inject(MAT_DIALOG_DATA);
  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CriarAmbienteComponent>);

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

  id!: number;

  ngOnInit(): void {
    this.formulario.patchValue({ 'nome': this.data.ambiente.nome })
    this.formulario.patchValue({ 'descricao': this.data.ambiente.descricao })
    this.formulario.patchValue({ 'localizacao': this.data.ambiente.localizacao })
    this.id = this.data.ambiente.id;
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
