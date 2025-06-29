import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { CheckListAmbienteDetalhado } from '../../core/types/CheckListAmbienteResponse';
import { ChecklistAmbienteService } from '../../core/services/checklist-ambiente.service';
import { CabecalhoChecklistsCompartimentoComponent } from './components/cabecalho-checklists-compartimento/cabecalho-checklists-compartimento.component';
import { GridChecklistsCompartimentoComponent } from "./components/grid-checklists-compartimento/grid-checklists-compartimento.component";
import { ChecklistCompartimentoResumo } from '../../core/types/ChecklistCompartimentoResponse';
import { ChecklistCompartimentoService } from '../../core/services/checklist-compartimento.service';

@Component({
  selector: 'app-checklists-compartimento',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoChecklistsCompartimentoComponent,
    GridChecklistsCompartimentoComponent
],
  templateUrl: './checklists-compartimento.component.html',
  styleUrl: './checklists-compartimento.component.css'
})
export class ChecklistsCompartimentoComponent implements OnInit {

  private checklistAmbienteService = inject(ChecklistAmbienteService);
  private checklistCompartimentoService = inject(ChecklistCompartimentoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastrService);
  checklistAmbiente: CheckListAmbienteDetalhado = {
    id: 0,
    ambiente: {
      id: 0,
      nome: '',
      descricao: '',
      localizacao: '',
      imagem: ''
    },
    dataHoraAbertura: new Date(),
    dataHoraLiberacao: new Date(),
    dataHoraEncerramento: new Date(),
    responsavelAbertura: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    responsavelLiberacao: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    responsavelEncerramento: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    status: ''
  }
  checklistsCompartimento: ChecklistCompartimentoResumo[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.checklistAmbiente.id = Number(id);
        this.buscarChecklistAmbientePeloId();
        this.buscarChecklistsCompartimento();
        return;
      }
      this.toast.error('ID do checklist de ambiente não encontrado na rota.');
    })
  }

  buscarChecklistAmbientePeloId(): void {
    this.checklistAmbienteService.buscarChecklistDeAmbientePeloId(this.checklistAmbiente.id).subscribe(
      {
        next: (resposta) => {
          this.checklistAmbiente = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  buscarChecklistsCompartimento(): void {
    this.checklistCompartimentoService
      .buscarCheckListCompartimentoPeloCheckListAmbiente(this.checklistAmbiente.id)
      .subscribe(
        {
          next: (resposta) => {
            this.checklistsCompartimento = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar checklists de compartimento: ${err.error.mensagens}`, 'ERROR');
          }
        }
      )
  }
  
  navegarParaChecklistsAmbiente(): void {
    this.router.navigate([`ambientes/${this.checklistAmbiente.ambiente.id}/checklists`]);
  }
}
