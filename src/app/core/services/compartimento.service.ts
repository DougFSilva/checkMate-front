import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartimentoService {

  private http = inject(HttpClient);

}
