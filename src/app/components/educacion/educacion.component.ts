import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  isLogged = false;
  isAdmin = false;

  constructor(
    private educacionS: EducacionService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarEducacion();
    this.VerificarPermisos();
  }

  VerificarPermisos(): void {
    if (this.tokenService.getToken()) {
      const token = this.tokenService.getToken();
      const roles = this.tokenService.getAuthorities();
      this.isAdmin = roles && roles.includes('ROLE_ADMIN');
      this.isLogged = true;
    } else {
      this.isAdmin = false;
      this.isLogged = false;
    }
  }

  cargarEducacion(): void {
    this.educacionS.lista().subscribe(
      data => {
        this.educacion = data;
      }
    );
  }

  delete(id?: number) {
    if (id !== undefined) {
      this.educacionS.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        },
        err => {
          alert('No se ha podido eliminar');
        }
      );
    }
  }
}
