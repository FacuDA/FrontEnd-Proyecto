import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit{
  persona: persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService) {}

  isLogged= false;
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
        this.cargarPersona();
        this.VerificarPermisos();
      }

  cargarPersona(){
    this.personaService.detail(1).subscribe(data =>
      {this.persona = data}  
      )
  }
}
