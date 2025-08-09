import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CheckListAmbienteResumo } from '../../../../core/types/CheckListAmbienteResponse';
import { Chart} from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafico-checklist-ambiente',
  imports: [CommonModule],
  templateUrl: './grafico-checklist-ambiente.component.html',
  styleUrl: './grafico-checklist-ambiente.component.css'
})
export class GraficoChecklistAmbienteComponent implements OnChanges, AfterViewInit {
   @ViewChild('graficoChecklistPorAmbienteCanvas', { static: false })
  graficoChecklistPorAmbienteCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() checklists: CheckListAmbienteResumo[] = [];

  public graficoChecklistPorAmbienteChart?: Chart;
  private isViewInitialized = false;

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.criarOuAtualizarGrafico();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checklists'] && this.isViewInitialized) {
      setTimeout(() => this.criarOuAtualizarGrafico());
    }
  }

  criarOuAtualizarGrafico(): void {
    if (!this.graficoChecklistPorAmbienteCanvas) {
      return;
    }

    if (this.checklists.length === 0) {
      // Se não tem dados, destrói gráfico existente e sai
      if (this.graficoChecklistPorAmbienteChart) {
        this.graficoChecklistPorAmbienteChart.destroy();
        this.graficoChecklistPorAmbienteChart = undefined;
      }
      return;
    }

    const checklistOrdenado = [...this.checklists].sort((a, b) => {
      const nomeA = a.ambiente?.nome ?? '';
      const nomeB = b.ambiente?.nome ?? '';
      return nomeA.localeCompare(nomeB);
    });

    const contagemMap = new Map<string, number>();
    for (const item of checklistOrdenado) {
      const nomeAmbiente = item.ambiente?.nome ?? 'Sem nome';
      contagemMap.set(nomeAmbiente, (contagemMap.get(nomeAmbiente) || 0) + 1);
    }

    const labels = Array.from(contagemMap.keys());
    const valores = Array.from(contagemMap.values());

    if (this.graficoChecklistPorAmbienteChart) {
      this.graficoChecklistPorAmbienteChart.data.labels = labels;
      this.graficoChecklistPorAmbienteChart.data.datasets[0].data = valores;
      this.graficoChecklistPorAmbienteChart.update();
      return;
    }

    const ctx = this.graficoChecklistPorAmbienteCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas 2D context não disponível.');
      return;
    }

    this.graficoChecklistPorAmbienteChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '',
          data: valores,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

}