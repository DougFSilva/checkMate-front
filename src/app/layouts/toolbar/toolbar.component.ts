import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioAutenticado } from '../../core/types/UsuarioAutenticado';


@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  usuario: UsuarioAutenticado = {
    email: '',
    nome: '',
    senhaAlterada: false,
    exp: 0,
    iat: 0,
    perfil: ''
  }

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private authService = inject(AuthService)
  @Output() botaoSidenav = new EventEmitter<void>();
  tituloToolbar: string = 'Home'; // Título padrão
  
  comandarSidenav() {
    this.botaoSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioAutenticado();
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map(event => this.obterRotaAtivaMaisProfunda(event.snapshot)?.data?.['title'])
    ).subscribe(title => {
      if (title) {
        this.tituloToolbar = title;
      } else {
        this.tituloToolbar = 'CheckMate';
      }
    });

    this.tituloToolbar = this.obterRotaAtivaMaisProfunda(this.activatedRoute.snapshot)?.data?.['title'] || 'Home';
  }

  private obterRotaAtivaMaisProfunda(snapshot: any): any {
    let atual  = snapshot;
    while (atual ?.firstChild) {
      atual = atual .firstChild;
    }
    return atual ;
  }
}

