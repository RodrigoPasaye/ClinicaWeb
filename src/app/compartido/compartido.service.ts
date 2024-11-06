import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../user/interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private _snackbar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackbar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: 'top',
      duration: 3000
    })
  }

  guardarSesion(sesion: Sesion) {
    localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
  }

  obtenerSesion() {
    const sesionString = localStorage.getItem("usuarioSesion");
    const usuariotoken = JSON.parse(sesionString!);
    return usuariotoken;
  }

  eliminarSesion() {
    localStorage.removeItem("usuarioSesion");
  }
}
