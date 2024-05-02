import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {response} from "express";
import {Alumne} from "../clientModules/alumne";
import {Departament} from "../clientModules/departament.model";
import {AnyCatcher} from "rxjs/internal/AnyCatcher";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UF2-ExIsmaelNaciriFernandez';

  constructor(private http: HttpClient) {
    this.llistaAssigNaciriFernandez();
    this.nouDeptNaciriFernandez();
    this.naiDe10NaciriFernandez();
    this.aveMariaNaciriFernandez();

  }

  llistaAssigNaciriFernandez() {
    this.http.get<any>("http://localhost:3080/llistaAssigNaciriFernandez").subscribe(
      response => {
        if (response) {
          console.log("Response from server: ", response);
        }
      }
    )
  }

  aveMariaNaciriFernandez() {
    this.http.put<any>("http://localhost:3080/vergeNaciriFernandez", {value: 3}).subscribe(
      response => {
        if (response) {
          console.log("Response from server: ", response);
        }
      }
    )
  }

  naiDe10NaciriFernandez() {
    this.http.get<Alumne[]>("http://localhost:3080/naiDe10NaciriFernandez").subscribe(
      response => {
        response.forEach((alumn) => {
          console.log("Alumne DNI: " + alumn.ALUMN_DNI);
          console.log("Alumne NOM: " + alumn.ALUMN_NOM);
          console.log("Alumne COGNOM 1: " + alumn.ALUMN_COGNOM_1);
          console.log("Alumne COGNOM 2: " + alumn.ALUMN_COGNOM_2);
        })
      }
    )
  }

  nouDeptNaciriFernandez() {
    this.http.post<any>("http://localhost:3080/nouDeptNaciriFernandez",
      new Departament(
        90, "LLENGUES", "FACULTAT DE LLENGUES", "972418999", "9999")
    ).subscribe(response => {
      if (response) {
        console.log("Response from server: ", response);
      }
    });
  }
}
