import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartaoChecklistCompartimentoComponent } from '../../../../shared/checklist-compartimento/cartao-checklist-compartimento/cartao-checklist-compartimento.component';
import { ChecklistCompartimentoResumo } from '../../../../core/types/ChecklistCompartimentoResponse';

@Component({
  selector: 'app-grid-checklists-compartimento',
  imports: [
    CartaoChecklistCompartimentoComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './grid-checklists-compartimento.component.html',
  styleUrl: './grid-checklists-compartimento.component.css'
})
export class GridChecklistsCompartimentoComponent implements OnInit, OnChanges {

  @Input() checklists!: ChecklistCompartimentoResumo[];
  filtro = '';
  checklistsFiltrados: ChecklistCompartimentoResumo[] = [];

  ngOnInit(): void {
    this.checklistsFiltrados = this.checklists;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['checklists']) {
      this.checklistsFiltrados = this.checklists;
    }
  }

  filtrarPeloNome(): void {
    if (this.filtro === '') {
      this.checklistsFiltrados = this.checklists;
      return;
    }
    console.log('teste');
    this.checklistsFiltrados = this.checklists.filter(checklist => {
      return checklist.compartimento.nome
        .toLowerCase()
        .includes(this.filtro.trim().toLowerCase());
    })
  }
}
