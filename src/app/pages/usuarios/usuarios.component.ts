import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-usuarios',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ContainerPrincipalComponent,
    TituloComponent
],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
   
}
