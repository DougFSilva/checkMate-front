import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CabecalhoDetalhesAmbienteComponent } from './components/cabecalho-detalhes-ambiente/cabecalho-detalhes-ambiente.component';

@Component({
  selector: 'app-detalhes-ambiente',
  imports: [
    ContainerPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    CabecalhoDetalhesAmbienteComponent
  ],
  templateUrl: './detalhes-ambiente.component.html',
  styleUrl: './detalhes-ambiente.component.css'
})
export class DetalhesAmbienteComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  id!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = Number(id);
        return;
      } 
      this.toast.error('ID do ambiente não encontrado na rota.');
    })
  }

}
