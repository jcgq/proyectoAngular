import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a mi página web en Angular';
  curso = 'Angular 7 con Spring 5';
  alumno : string = 'Juan Carlos González Quesada';
}
