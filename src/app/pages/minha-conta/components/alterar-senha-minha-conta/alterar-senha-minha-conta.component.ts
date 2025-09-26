import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../../core/services/auth.service';
import { AlteraSenhaUsuarioForm } from '../../../../core/types/AlteraSenhaUsuarioForm';
import { ConfirmacaoComponent } from '../../../../shared/dialog/confirmacao/confirmacao.component';
import { BotaoCancelarComponent } from "../../../../shared/botao-cancelar/botao-cancelar.component";
import { BotaoConfirmarComponent } from "../../../../shared/botao-confirmar/botao-confirmar.component";


@Component({
  selector: 'app-alterar-senha-minha-conta',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    BotaoCancelarComponent,
    BotaoConfirmarComponent
],
  templateUrl: './alterar-senha-minha-conta.component.html',
  styleUrl: './alterar-senha-minha-conta.component.css'
})
export class AlterarSenhaMinhaContaComponent {

  @ViewChild('inputSenhaAtual') inputSenhaAtual!: ElementRef;
  @ViewChild('inputNovaSenha') inputNovaSenha!: ElementRef;
  @ViewChild('inputConfirmacaoSenha') inputConfirmacaoSenha!: ElementRef;
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<AlterarSenhaMinhaContaComponent>);
  private toast = inject(ToastrService);
  public data = inject(MAT_DIALOG_DATA);
  senhaAtualVisivel: boolean = false;
  novaSenhaVisivel: boolean = false;
  confirmacaoSenhaVisivel: boolean = false;

  alteraSenhaForm: AlteraSenhaUsuarioForm = {
    email: '',
    senhaAtual: '',
    novaSenha: ''
  }

  form = new FormGroup({
    senhaAtual: new FormControl('', [Validators.required]),
    novaSenha: new FormControl('', [Validators.required]),
    confirmacaoSenha: new FormControl('', [Validators.required])
  });

  abrirDialogConfirmacaoAlterarSenha(): void {
    if (this.form.invalid) {
      this.toast.info('Preencha corretamente o formuário', 'INFO');
      return;
    }
    if (this.form.get('novaSenha')?.value != this.form.get('confirmacaoSenha')?.value) {
      this.toast.info('A nova senha e a confirmação devem ser iguais', 'INFO')
      return;
    }
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: 'Deseja realmente alterar a senha?' } });
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response) this.alterarSenha();
      }
    })
  }

  alterarSenha(): void {
    this.alteraSenhaForm = this.form.value as unknown as AlteraSenhaUsuarioForm;
    this.alteraSenhaForm.email = this.data.email;
    this.authService.alterarSenha(this.alteraSenhaForm).subscribe({
      next: () => {
        this.toast.success('Senha alterada com sucesso', 'SUCESSO');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toast.error(`Erro ao alterar a senha de usuário: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

  toggleSenhaAtualVisivel() {
    this.senhaAtualVisivel = !this.senhaAtualVisivel;
    if (this.inputSenhaAtual) {
      this.inputSenhaAtual.nativeElement.type = this.senhaAtualVisivel ? 'text' : 'password';
    }
  }

  toggleNovaSenhaVisivel() {
    this.novaSenhaVisivel = !this.novaSenhaVisivel;
    if (this.inputNovaSenha) {
      this.inputNovaSenha.nativeElement.type = this.novaSenhaVisivel ? 'text' : 'password';
    }
  }

  toggleConfirmacaoSenhaVisivel() {
    this.confirmacaoSenhaVisivel = !this.confirmacaoSenhaVisivel;
    if (this.inputConfirmacaoSenha) {
      this.inputConfirmacaoSenha.nativeElement.type = this.confirmacaoSenhaVisivel ? 'text' : 'password';
    }
  }
}
