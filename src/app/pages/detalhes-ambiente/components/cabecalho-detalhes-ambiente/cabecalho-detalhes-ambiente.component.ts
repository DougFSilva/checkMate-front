import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { AmbienteDetalhado } from '../../../../core/types/AmbienteResponse';
import { CartaoDetalhesAmbienteComponent } from '../cartao-detalhes-ambiente/cartao-detalhes-ambiente.component';
import { CartaoMetricaComponent } from '../../../../shared/cartao-metrica/cartao-metrica.component';

@Component({
  selector: 'app-cabecalho-detalhes-ambiente',
  imports: [
    MatIconModule,
    MatButtonModule,
    CartaoDetalhesAmbienteComponent,
    CartaoMetricaComponent
],
  templateUrl: './cabecalho-detalhes-ambiente.component.html',
  styleUrl: './cabecalho-detalhes-ambiente.component.css'
})
export class CabecalhoDetalhesAmbienteComponent {

  private router = inject(Router);
  @Input() ambiente!: AmbienteDetalhado;
  @Output() ambienteModificado = new EventEmitter<void>();

  navegarParaTelaAmbientes(): void {
    this.router.navigate(['ambientes'])
  }

}
