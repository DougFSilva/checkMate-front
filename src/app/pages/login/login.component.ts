import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';
import { LoginForm } from '../../core/types/LoginForm';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private authSubscription: Subscription | undefined;

  formulario = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    }
  );

  ngOnInit(): void {
    this.authSubscription = this.authService.statusAutenticacao.subscribe(
      usuario => {
        if (usuario.nome) {
          this.toast.success(`Seja bem-vindo(a) ${usuario.nome}`)
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  autenticar() {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulário');
    }
    this.authService.autenticar(this.formulario.value as LoginForm).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err.error);
        this.toast.error(`Erro na autenticação: ${err.error.mensagens}`)
      }
    }
    )
  }
  
}
