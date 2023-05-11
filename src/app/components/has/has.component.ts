import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-has',
  templateUrl: './has.component.html',
  styleUrls: ['./has.component.css']
})
export class HasComponent implements OnInit {
  skill: Skill[] = [];

  constructor(private skillS: SkillService, private tokenService: TokenService) { }
  
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
        this.cargarSkills();
        this.VerificarPermisos();
      }

  cargarSkills(): void{
    this.skillS.lista().subscribe(
      data => {
        this.skill = data;
      }
    )
  }

  delete(id: number){
    if(id != undefined){
      this.skillS.delete(id).subscribe(
        data => {
          this.cargarSkills();
        }, err => {
          alert("No se pudo borrar la skill");
        }
      )
    }
  }
}
