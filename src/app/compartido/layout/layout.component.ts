import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidoService } from '../compartido.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userName: string = '';

  constructor(private router: Router, private commonService: CompartidoService) { }

  ngOnInit(): void {
    const usuario = this.commonService.obtenerSesion();

    if (usuario != null) {
      this.userName = usuario.userName
    }
  }

  cerrarSesion() {
    this.commonService.eliminarSesion();
    this.router.navigate(['login']);
  }
}
