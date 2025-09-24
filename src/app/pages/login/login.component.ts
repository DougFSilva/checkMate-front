import { Component, ElementRef, inject, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
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
export class LoginComponent implements OnChanges {

  @ViewChild('inputSenha') inputSenha!: ElementRef;
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  senhaVisivel: boolean = false;
  formulario = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    }
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['senhaVisivel'] && changes['senhaVisivel'].currentValue) {
      this.inputSenha.nativeElement.style.type = "text";
    }
  }

  autenticar() {
    if (this.formulario.invalid) {
      this.toast.info('Preencha corretamente o formulário', 'INFO');
      return;
    }
    this.authService.autenticar(this.formulario.value as LoginForm).subscribe({
      next: (response) => {
        if (response.body?.senhaAlterada) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/alterar-senha'], {
            queryParams: { email: this.formulario.value.email }
          });
        }
      },
      error: (err) => {
        this.toast.error(`Erro na autenticação: ${err.error.mensagens}`, 'ERRO')
        console.error(err.error);
      }
    }
    )
  }

  toggleSenhaVisivel() {
    this.senhaVisivel = !this.senhaVisivel;
    if (this.inputSenha) {
      this.inputSenha.nativeElement.type = this.senhaVisivel ? 'text' : 'password';
    }

  }
}
