import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expoe-imagem',
  imports: [],
  templateUrl: './expoe-imagem.component.html',
  styleUrl: './expoe-imagem.component.css'
})
export class ExpoeImagemComponent implements OnInit {
    public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data.src)
  }
}
