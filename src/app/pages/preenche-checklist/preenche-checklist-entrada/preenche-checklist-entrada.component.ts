import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChecklistCompartimentoService } from '../../../core/services/checklist-compartimento.service';
import { ItemChecklistService } from '../../../core/services/item-checklist.service';
import { ChecklistCompartimentoDetalhado } from '../../../core/types/ChecklistCompartimentoResponse';
import { ItemChecklistForm } from '../../../core/types/ItemChecklistForm';
import { ItemChecklistResumo } from '../../../core/types/ItemChecklistResponse';
import { PreencheCheckistForm } from '../../../core/types/PreencheChecklistForm';
import { ContainerPrincipalComponent } from '../../../shared/container-principal/container-principal.component';
import { ConfirmacaoComponent } from '../../../shared/dialog/confirmacao/confirmacao.component';
import { CabecalhoPreencheChecklistComponent } from '../components/cabecalho-preenche-checklist/cabecalho-preenche-checklist.component';
import { FormularioPreenchChecklistEntradaComponent } from "../components/formulario-preench-checklist-entrada/formulario-preench-checklist-entrada.component";
import { TituloComponent } from "../../../shared/titulo/titulo.component";

@Component({
  selector: 'app-preenche-checklist-entrada',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoPreencheChecklistComponent,
    FormularioPreenchChecklistEntradaComponent,
    TituloComponent
],
  templateUrl: './preenche-checklist-entrada.component.html',
  styleUrl: './preenche-checklist-entrada.component.css'
})
export class PreencheChecklistEntradaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private checklistCompartimentoService = inject(ChecklistCompartimentoService);
  private itemChecklistService = inject(ItemChecklistService);
  private preencheChecklistForm: PreencheCheckistForm = {
    checkListCompartimentoID: 0,
    itens: [],
    observacao: ''
  }
  checklist: Partial<ChecklistCompartimentoDetalhado> = {};
  itensChecklist: ItemChecklistResumo[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.checklist.id = Number(id);
        this.preencheChecklistForm.checkListCompartimentoID = Number(id);
        this.buscarChecklistCompartimento();
        this.buscarItensChecklist();
        return;
      }
      this.toast.error('ID do checklist de compartimento não encontrado na rota.');
    })
  }

  buscarChecklistCompartimento(): void {
    this.checklistCompartimentoService
      .buscarCheckListCompartimentoPeloID(this.checklist.id!)
      .subscribe({
        next: (response) => {
          this.checklist = response;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar checklist de compartimento: ${err.error.mensagens}`, 'ERRO');
        }
      });
  }

  buscarItensChecklist(): void {
    this.itemChecklistService
      .buscarItensChecklistPeloChecklistCompartimento(this.checklist.id!)
      .subscribe(
        {
          next: (resposta) => {
            this.itensChecklist = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar itens de checklist: ${err.error.mensagens}`, 'ERRO');
          }
        }
      )
  }

  abrirDialogEnviarChecklist(itens: ItemChecklistForm[]): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': 'Dejesa realmente enviar o checklist?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.enviarChecklist(itens);
      }
    });
  }

  enviarChecklist(itens: ItemChecklistForm[]): void {
    this.preencheChecklistForm.itens = itens;
    this.checklistCompartimentoService.preencherChecklistEntrada(this.preencheChecklistForm).subscribe(
      {
        next: () => {
          this.toast.success('Checklist de entrada preenchido com sucesso!');
          this.buscarChecklistCompartimento();
        },
        error: (err) => {
          this.toast.error(`Erro ao preencher checklist de entrada: ${err.error.mensagens}`);
        }
      }
    )
  }

}

