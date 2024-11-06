import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private commonService: CompartidoService) {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    this.mostrarLoading = true;

    const request: Login = {
      userName: this.formLogin.value.userName,
      password: this.formLogin.value.password
    };

    this.userService.iniciarSesion(request).subscribe({
      next: (response) => {
        this.commonService.guardarSesion(response);
        this.router.navigate(['layout']);
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: (error) => {
        this.commonService.mostrarAlerta(error.error, 'Error!')
        this.mostrarLoading = false;
      }
    });
  }

}
