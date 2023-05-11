import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  expe: Experiencia[] = [];
  
  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }

  isLogged = false;
  isAdmin = false;

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
    

      ngOnInit(): void {
        this.cargarExperiencia();
        this.VerificarPermisos();
      }

  cargarExperiencia():void{
    this.sExperiencia.lista().subscribe(data =>{this.expe = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err =>{
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }
}

