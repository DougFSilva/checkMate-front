import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { API_CONFIG } from '../../../config/API_CONFIG';
import { ItemChecklistForm } from '../../../core/types/ItemChecklistForm';
import { ItemChecklistResumo } from '../../../core/types/ItemChecklistResponse';
import { CartaoComponent } from '../../cartao/cartao.component';
import { ExpoeImagemComponent } from '../../expoe-imagem/expoe-imagem.component';
import { DialogDetalhesItemComponent } from '../../item/dialog-detalhes-item/dialog-detalhes-item.component';

@Component({
  selector: 'app-cartao-item-checklist-entrada',
  imports: [
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CartaoComponent,
    RouterModule
  ],
  templateUrl: './cartao-item-checklist-entrada.component.html',
  styleUrl: './cartao-item-checklist-entrada.component.css'
})
export class CartaoItemChecklistEntradaComponent implements OnInit, OnChanges {

  @Input() statusChecklist!: string;

  formulario = new FormGroup({
    status: new FormControl('', [Validators.required]),
    observacao: new FormControl('')
  })

  itemChecklistForm: ItemChecklistForm = {
    ID: 0,
    status: '',
    observacao: ''
  }

  @Input() item!: ItemChecklistResumo;
  baseUrl = API_CONFIG.baseUrl + '/imagens/'
  private cdRef = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.itemChecklistForm.ID = this.item.id;
    this.atualizarItemChecklistForm();
    this.atualizarFormulario();
    this.desabilitarFormulario()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statusChecklist']) {
      this.atualizarFormulario();
    }
  }

  onStatusChange(status: string): void {
    const observacaoControl = this.formulario.get('observacao');
    if (observacaoControl) {
      if (status !== 'OK' && status !== 'NAO_VERIFICADO') {
        observacaoControl.setValidators(Validators.required);
      } else {
        observacaoControl.clearValidators();
      }
      observacaoControl.updateValueAndValidity();
    }
    this.cdRef.detectChanges();
    this.atualizarItemChecklistForm()
  }

  atualizarItemChecklistForm(): void {
    this.itemChecklistForm.status = this.formulario.get('status')?.value as string || ''
    this.itemChecklistForm.observacao = this.formulario.get('observacao')?.value as string || ''
  }

  getItemChecklistForm(): ItemChecklistForm {
    this.atualizarItemChecklistForm();
    return this.itemChecklistForm;
  }

  atualizarFormulario(): void {
    this.formulario.get('status')?.patchValue(this.item.statusEntrada);
    this.formulario.get('observacao')?.patchValue(this.item.observacaoEntrada);
    this.desabilitarFormulario();
  }

  desabilitarFormulario() {
    if (this.statusChecklist !== 'NAO_PREENCHIDO') {
      this.formulario.disable()
    }
  }

  abrirImagem(src: string, alt: string): void {
    this.dialog.open(ExpoeImagemComponent, { data: { 'src': src, 'alt': alt } })
  }

  abrirDetalhesItem(): void {
    this.dialog.open(DialogDetalhesItemComponent, {
      data: {'id': this.item.item.id}, 
      autoFocus: false,
      panelClass : 'dialog-largura-largo'
      });
  }
}

