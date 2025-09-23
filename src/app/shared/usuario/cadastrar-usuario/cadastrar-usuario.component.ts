import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';

import { BotaoConfirmarComponent } from '../../botao-confirmar/botao-confirmar.component';
import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioForm } from '../../../core/types/UsuarioForm';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
@Component({
  selector: 'app-cadastrar-usuario',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BotaoConfirmarComponent,
    BotaoCancelarComponent,
    MatSelectModule
  ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {

  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<CadastrarUsuarioComponent>);
  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    CPF: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoPerfil: new FormControl('', [Validators.required]),
    dataValidade: new FormControl('', Validators.required)
  });

  usuarioForm: UsuarioForm = {
    nome: '',
    CPF: '',
    email: '',
    tipoPerfil: '',
    dataValidade: new Date()
  }

  abrirDialogConfirmacao(): void {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulario', 'INFO');
      return;
    }
    let dialog = this.dialog.open(ConfirmacaoComponent,
      {data:{texto: 'Deseja realmente cadastrar um novo usuário?'}}
    )
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.cadastrarUsuario();
      }
    })
  }

  cadastrarUsuario(): void {
    this.usuarioForm = this.formulario.value as unknown as UsuarioForm;
    this.service.cadastrarUsuario(this.usuarioForm).subscribe({
      next: () => {
        this.toast.success('Usuário cadastrado com sucesso', 'SUCESSO');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(`Erro ao cadastrar usuário: ${err.error.mensagens}`);
        console.error(err);
      }
    })
  }
}
