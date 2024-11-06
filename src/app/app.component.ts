import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo:string = 'ClinicaWeb';
  usuarios: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5171/api/User').subscribe({
      next: response => this.usuarios = response,
      error: error => console.log(error),
      complete: () => console.log('La solicitud esta completa'),
    });
  }
}
