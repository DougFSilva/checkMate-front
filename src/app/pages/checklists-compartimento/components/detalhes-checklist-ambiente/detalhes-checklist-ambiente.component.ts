import { Component, inject, Input } from '@angular/core';
import { CheckListAmbienteDetalhado } from '../../../../core/types/CheckListAmbienteResponse';
import { StatusChecklistAmbienteComponent } from '../../../../shared/checklist-ambiente/status-checklist-ambiente/status-checklist-ambiente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CartaoDadosUsuarioComponent } from '../../../../shared/usuario/cartao-dados-usuario/cartao-dados-usuario.component';

@Component({
  selector: 'app-detalhes-checklist-ambiente',
  imports: [
    StatusChecklistAmbienteComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './detalhes-checklist-ambiente.component.html',
  styleUrl: './detalhes-checklist-ambiente.component.css'
})
export class DetalhesChecklistAmbienteComponent {

  @Input() checklist: Partial<CheckListAmbienteDetalhado> = {};
  private dialog = inject(MatDialog);

  abrirDetalhesUsuario(id: number): void {
    this.dialog.open(CartaoDadosUsuarioComponent, {data: {id : id}});
  }
}
