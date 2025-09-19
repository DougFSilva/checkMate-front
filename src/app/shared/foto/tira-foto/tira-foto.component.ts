import { Component, ViewChild, ElementRef, OnDestroy, OnInit, Output, EventEmitter, Input, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { BotaoAcaoComponent } from "../../botao-acao/botao-acao.component";

@Component({
  selector: 'app-tira-foto',
  imports: [CommonModule, BotaoAcaoComponent],
  templateUrl: './tira-foto.component.html',
  styleUrl: './tira-foto.component.css'
})
export class TiraFotoComponent implements OnInit, OnDestroy {

  @Input() tipoDeFoto: string = 'elemento';
  @Output() fotoCapturada = new EventEmitter<Blob>();
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  isCameraOpen = false;
  capturedImageUrl: string | null = null;
  capturedBlob: Blob | null = null;
  stream: MediaStream | null = null;
  status = '';
  isVideoReady = false;

  ngOnInit(): void {
    this.iniciarCamera();
  }

  ngOnDestroy() {
    this.fecharCamera();
    this.resetCaptura();
  }

  private iniciarCamera() {
    this.isCameraOpen = true;
    this.isVideoReady = false;
    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      if (this.videoElement) {
        this.abrirCamera();
      } else {
        console.warn('Elemento <video> ainda não disponível. Tentando novamente...');
        setTimeout(() => this.abrirCamera(), 150);
      }
    });
  }

  async abrirCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: { ideal: 4 / 3 }
        }
      });

      const video = this.videoElement.nativeElement;
      video.srcObject = this.stream;

      video.onloadedmetadata = () => {
        video.play().then(() => {
          this.isVideoReady = true;
          this.status = `Câmera ativada para fotografar o ${this.tipoDeFoto}!`;
          this.cdr.detectChanges();
        }).catch(error => {
          console.error('Erro ao iniciar reprodução do vídeo:', error);
          this.status = 'Erro ao iniciar a reprodução do vídeo.';
        });
      };

      video.onerror = (error) => {
        console.error('Erro no elemento de vídeo:', error);
        this.status = 'Erro no elemento de vídeo.';
      };

    } catch (error) {
      this.status = 'Erro ao acessar a câmera. Verifique as permissões.';
      console.error('Erro ao acessar câmera:', error);
    }
  }

  fecharCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isCameraOpen = false;
    this.isVideoReady = false;
    this.status = '';
  }

  tirarFoto() {
    if (!this.videoElement || !this.isVideoReady) {
      this.status = 'Aguarde a câmera estar totalmente carregada...';
      return;
    }

    const video = this.videoElement.nativeElement;

    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      this.status = 'Vídeo ainda não está pronto. Tente novamente em um momento.';
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    // Força proporção 4:3
    const aspectRatio = 4 / 3;
    let sourceWidth = video.videoWidth;
    let sourceHeight = video.videoHeight;
    let sourceX = 0;
    let sourceY = 0;

    if (sourceWidth / sourceHeight > aspectRatio) {
      sourceWidth = sourceHeight * aspectRatio;
      sourceX = (video.videoWidth - sourceWidth) / 2;
    } else {
      sourceHeight = sourceWidth / aspectRatio;
      sourceY = (video.videoHeight - sourceHeight) / 2;
    }

    const outputWidth = 1920;
    const outputHeight = 1440;
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outputWidth, outputHeight);

    ctx.drawImage(
      video,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, outputWidth, outputHeight
    );

    this.capturarFoto(canvas, outputWidth, outputHeight);
  }

  private capturarFoto(canvas: HTMLCanvasElement, outputWidth: number, outputHeight: number) {
    canvas.toBlob((blob) => {
      if (blob) {
        this.capturedBlob = blob;

        if (this.capturedImageUrl) {
          URL.revokeObjectURL(this.capturedImageUrl);
        }
        this.capturedImageUrl = URL.createObjectURL(blob);
        this.status = `Foto capturada em proporção 4:3 (${outputWidth}x${outputHeight}px)!`;
        this.cdr.detectChanges();

        this.fecharCamera();
      } else {
        this.status = 'Erro ao capturar foto. Tente novamente.';
      }
    }, 'image/jpeg', 0.9);
  }

  abrirDialogConfirmacao(): void {
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': 'Deseja realmente salvar a imagem?' } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.enviarFotoCapturada();
      }
    });
  }

  enviarFotoCapturada() {
    if (!this.capturedBlob) {
      this.status = 'Nenhuma foto para enviar.';
      return;
    }
    this.fotoCapturada.emit(this.capturedBlob);
  }

  tirarNovaFoto() {
    this.resetCaptura();
    this.status = 'Reiniciando câmera...';
    this.iniciarCamera();
  }

  resetCaptura() {
    if (this.capturedImageUrl) {
      URL.revokeObjectURL(this.capturedImageUrl);
    }
    this.capturedImageUrl = null;
    this.capturedBlob = null;
    this.status = '';
  }

  permitirTirarFoto(): boolean {
    return this.isCameraOpen && this.isVideoReady && this.videoElement?.nativeElement?.readyState === 4;
  }
}