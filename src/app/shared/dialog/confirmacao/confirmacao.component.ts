import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { BotaoCancelarComponent } from '../../botao-cancelar/botao-cancelar.component';
import { BotaoConfirmarComponent } from "../../botao-confirmar/botao-confirmar.component";

@Component({
  selector: 'app-confirmacao',
  imports: [
    MatButtonModule,
    MatIconModule,
    BotaoCancelarComponent,
    BotaoConfirmarComponent
],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent {

  public dialogRef = inject(MatDialogRef<ConfirmacaoComponent>);
  data: any = inject(MAT_DIALOG_DATA);
}
