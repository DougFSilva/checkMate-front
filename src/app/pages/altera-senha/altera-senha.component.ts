import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-altera-senha',
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './altera-senha.component.html',
  styleUrl: './altera-senha.component.css'
})
export class AlteraSenhaComponent implements OnInit, OnDestroy {

  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private authSubscription: Subscription | undefined;

  formulario = new FormGroup(
    {
      senhaAtual: new FormControl('', [Validators.required]),
      novaSenha: new FormControl('', Validators.required),
      confirmacaoSenha: new FormControl('', Validators.required)
    }
  );

  ngOnInit(): void {
    // this.authSubscription = this.authService.statusAutenticacao.subscribe(
    //   usuario => {
    //     if (usuario.nome) {
    //       this.toast.success(`Seja bem-vindo(a) ${usuario.nome}`)
    //     }
    //   }
    // )
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  alterarSenha() {
    // if (this.formulario.invalid) {
    //   this.toast.info('Preencha corretamente o formulário');
    //   return;
    // }
    // if (this.formulario.get('novaSenha') != this.formulario.get('confirmacaoSenha')) {
    //   this.toast.info('A nova senha e a confirmação de senha devem ser iguais');
    // }
    // this.authService.autenticar(this.formulario.value as LoginForm).subscribe({
    //   next: () => {
    //     this.router.navigate(['']);
    //   },
    //   error: (err) => {
    //     console.error(err.error);
    //     this.toast.error(`Erro na autenticação: ${err.error.mensagens}`)
    //   }
    // }
    // )
  }

}
