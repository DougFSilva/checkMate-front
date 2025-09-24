import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';
import { AlteraSenhaUsuarioForm } from '../../core/types/AlteraSenhaUsuarioForm';

@Component({
  selector: 'app-altera-senha',
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './altera-senha.component.html',
  styleUrl: './altera-senha.component.css'
})
export class AlteraSenhaComponent implements OnInit {

  @ViewChild('inputSenhaAtual') inputSenhaAtual!: ElementRef;
  @ViewChild('inputNovaSenha') inputNovaSenha!: ElementRef;
  @ViewChild('inputConfirmacaoSenha') inputConfirmacaoSenha!: ElementRef;
  private service = inject(AuthService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  senhaAtualVisivel: boolean = false;
  novaSenhaVisivel: boolean = false;
  confirmacaoSenhaVisivel: boolean = false;

  formulario = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      senhaAtual: new FormControl('', [Validators.required]),
      novaSenha: new FormControl('', Validators.required),
      confirmacaoSenha: new FormControl('', Validators.required)
    }
  );

  alteraSenhaForm: AlteraSenhaUsuarioForm = {
    email: '',
    senhaAtual: '',
    novaSenha: ''
  };

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.formulario.patchValue({ email: params['email'] });
    });
  }

  alterarSenha() {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulário', 'INFO');
      return;
    }
    if (this.formulario.get('novaSenha')?.value != this.formulario.get('confirmacaoSenha')?.value) {
      this.toast.info('A nova senha e a confirmação de senha devem ser iguais', 'INFO');
      return;
    }
    this.alteraSenhaForm = this.formulario.value as unknown as AlteraSenhaUsuarioForm;
    this.service.alterarSenha(this.alteraSenhaForm!).subscribe({
      next: () => {
        this.toast.success('Senha alterada com sucesso!', 'SUCESSO');
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error(err.error);
        this.toast.error(`Erro na alteração da senha: ${err.error.mensagens}`, 'ERRO')
      }
    }
    )
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
