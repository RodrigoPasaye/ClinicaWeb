import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialidad } from '../../interfaces/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';

@Component({
  selector: 'app-modal-especialidad',
  templateUrl: './modal-especialidad.component.html',
  styleUrls: ['./modal-especialidad.component.css']
})
export class ModalEspecialidadComponent implements OnInit {
  
  formEspecialidad: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';

  constructor(private modal: MatDialogRef<ModalEspecialidadComponent>, 
    @Inject(MAT_DIALOG_DATA) public especialidadDto: Especialidad,
    private fb: FormBuilder, private _especialidadService: EspecialidadService,
    private _compartidoService: CompartidoService
  ) {
      this.formEspecialidad = this.fb.group({
        nombreEspecialidad: ['', Validators.required],
        descripcion: ['', Validators.required],
        activo: ['1', Validators.required]
      });

      if (especialidadDto != null) {
        this.titulo = 'Editar';
        this.nombreBoton = 'Actualizar';
      }
    }

  ngOnInit(): void {
    if (this.especialidadDto != null) {
      this.formEspecialidad.patchValue({
        nombreEspecialidad: this.especialidadDto.nombreEspecialidad,
        descripcion: this.especialidadDto.descripcion,
        activo: this.especialidadDto.activo.toString()
      });
    }
  }

  crearModificarEspecialidad() {
    const especialidad: Especialidad = {
      id: this.especialidadDto == null ? 0 : this.especialidadDto.id,
      nombreEspecialidad: this.formEspecialidad.value.nombreEspecialidad,
      descripcion: this.formEspecialidad.value.descripcion,
      activo: parseInt(this.formEspecialidad.value.activo)
    }

    if (this.especialidadDto == null) {
      this._especialidadService.crearEspecialidad(especialidad).subscribe({
        next: (data) => {
          if (data.isSuccessful) {
            this._compartidoService.mostrarAlerta('La Especialidad ha sido grabada con exito', 'Completo');
            this.modal.close("true");
          } else
            this._compartidoService.mostrarAlerta('No se pudo crear la especialidad', 'Error!');
        },
        error: (e) => {
          this._compartidoService.mostrarAlerta(e.error.errores, 'Error!');
        }
      });
    } else {
      this._especialidadService.editarEspecialidad(especialidad).subscribe({
        next: (data) => {
          if (data.isSuccessful) {
            this._compartidoService.mostrarAlerta('La Especialidad ha sido actualizada con exito', 'Completo');
            this.modal.close("true");
          } else
            this._compartidoService.mostrarAlerta('No se pudo actualizar la especialidad', 'Error!');
        },
        error: (e) => {
          this._compartidoService.mostrarAlerta(e.error.errores, 'Error!');
        }
      });
    }
  }

}
