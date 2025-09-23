import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { BotaoConfirmarComponent } from '../../botao-confirmar/botao-confirmar.component';
import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioForm } from '../../../core/types/UsuarioForm';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-editar-usuario',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent,
    MatSelectModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<EditarUsuarioComponent>);
  id!: number;

  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    CPF: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoPerfil: new FormControl('', [Validators.required]),
    dataValidade: new FormControl(new Date(), Validators.required)
  });

  usuarioForm: UsuarioForm = {
    nome: '',
    CPF: '',
    email: '',
    tipoPerfil: '',
    dataValidade: new Date()
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.buscarUsuarioPeloID();
  }

  buscarUsuarioPeloID(): void {
    this.service.buscarUsuarioPeloID(this.id).subscribe( 
      {
        next: (resposta) => {
          this.formulario.patchValue({ 'nome' : resposta.nome});
          this.formulario.patchValue({ 'CPF' : resposta.cpf});
          this.formulario.patchValue({ 'email' : resposta.email});
          this.formulario.patchValue({ 'tipoPerfil' : resposta.perfil});
          this.formulario.patchValue({ 'dataValidade' : resposta.dataValidade});
        },
        error: (err) => {
          console.error(err.error);
          this.toast.error(`Erro ao buscar ambiente: ${err.error.mensagens}`, 'ERRO')
        }
      }
    )
  }

  abrirDialogConfirmacao(): void {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulario', 'INFO');
      return;
    }
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente editar o usuário?' } }
    )
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.editarUsuario();
      }
    })
  }

  editarUsuario(): void {
    this.usuarioForm = this.formulario.value as unknown as UsuarioForm;
    this.service.editarUsuario(this.id, this.usuarioForm).subscribe({
      next: () => {
        this.toast.success('Usuário editado com sucesso', 'SUCESSO');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(`Erro ao editar usuário: ${err.error.mensagens}`);
        console.error(err);
      }
    })
  }
}
