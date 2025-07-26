import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { GridOcorrenciasComponent } from "./components/grid-ocorrencias/grid-ocorrencias.component";
import { PaginaOcorrencias } from '../../core/types/OcorrenciaResponse';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
import { AmbienteResumo } from '../../core/types/AmbienteResponse';
import { AmbienteService } from '../../core/services/ambiente.service';

@Component({
  selector: 'app-ocorrencias',
  imports: [
    ContainerPrincipalComponent,
    GridOcorrenciasComponent,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.css',
  providers: [provideNativeDateAdapter()]
})
export class OcorrenciasComponent implements OnInit {

  @Output() ocorrenciaEncerrada = new EventEmitter<void>();
  private service = inject(OcorrenciaService);
  private ambienteService = inject(AmbienteService);
  private toast = inject(ToastrService);
  ambientes: AmbienteResumo[] = [];
  ambienteFiltrado: AmbienteResumo | null = null;
  paginaOcorrencias: PaginaOcorrencias = {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      offset: 0,
      paged: false,
      unpaged: true,
    },
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
    numberOfElements: 0,
    size: 0,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    empty: true,
  }
  opcaoItensPorPagina: number[] = [10, 20, 40];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  dataRange = new FormGroup({
    dataInicial: new FormControl<Date | null>(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
    dataFinal: new FormControl<Date | null>(new Date()),
  });

  ngOnInit(): void {
    this.buscarOcorrencias();
    this.buscarAmbientes();
  }

  // buscarOcorrenciasPelaData(): void {
  //   const dataInicial = this.dataRange.get('dataInicial')!.value;
  //   const dataFinal = this.dataRange.get('dataFinal')!.value;
  //   if (dataInicial == null || dataFinal == null) {
  //     return;
  //   }
  //   this.service.buscarOcorrenciasPelaData(
  //     dataInicial, 
  //     dataFinal, 
  //     this.pagina, 
  //     this.itensPorPagina)
  //     .subscribe(
  //       {
  //         next: (resultado) => {
  //           this.paginaOcorrencias = resultado;
  //         },
  //         error: (err) => {
  //           this.toast.error(`Erro ao buscar ocorrências: ${err.error.mensagens}`);
  //         }
  //       }
  //     )
  // }

  buscarOcorrencias(): void {
    if (this.ambienteFiltrado === null) {
      this.buscarOcorrenciasPelaData();
      return;
    }
    this.buscarOcorrenciasPeloAmbienteEData();
  }

  buscarOcorrenciasPelaData(): void {
    const dataInicial = this.dataRange.get('dataInicial')!.value;
    const dataFinal = this.dataRange.get('dataFinal')!.value;
    if (dataInicial == null || dataFinal == null) {
      return;
    }
    this.service.buscarOcorrenciasPelaData(
      dataInicial, 
      dataFinal, 
      this.pagina, 
      this.itensPorPagina)
      .subscribe(
        {
          next: (resultado) => {
            this.paginaOcorrencias = resultado;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar ocorrências: ${err.error.mensagens}`);
          }
        }
      )
  }

  buscarOcorrenciasPeloAmbienteEData(): void {
    if(this.ambienteFiltrado === null) {
      return;
    }
    const dataInicial = this.dataRange.get('dataInicial')!.value;
    const dataFinal = this.dataRange.get('dataFinal')!.value;
    if (dataInicial == null || dataFinal == null) {
      return;
    }
    this.service.buscarOcorrenciasPeloAmbienteEData(
      this.ambienteFiltrado.id,
      dataInicial, 
      dataFinal, 
      this.pagina, 
      this.itensPorPagina)
      .subscribe(
        {
          next: (resultado) => {
            this.paginaOcorrencias = resultado;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar ocorrências: ${err.error.mensagens}`);
          }
        }
      )
  }

  buscarAmbientes(): void {
    this.ambienteService.buscarTodosAmbientes(0, 1000).subscribe(
      {
        next: (resposta) => {
          this.ambientes = resposta.content;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ambientes: ${err.error.mensagens}`);
        }
      }
    )
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize;
    this.buscarOcorrencias();
  }

  atualizarAmbienteSelecionado(event: MatSelectChange): void {
    if(event.value === 'Todos') {
      this.ambienteFiltrado = null;
    } else {
      this.ambienteFiltrado = event.value;
    }
    this.buscarOcorrencias();
  }
}
