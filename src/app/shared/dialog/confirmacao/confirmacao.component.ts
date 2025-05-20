import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmacao',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent {

  public dialogRef = inject(MatDialogRef<ConfirmacaoComponent>);
  data: any = inject(MAT_DIALOG_DATA);
}
