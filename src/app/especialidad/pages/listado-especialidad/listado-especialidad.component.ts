import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from '../../interfaces/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EspecialidadService } from '../../services/especialidad.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEspecialidadComponent } from '../../modals/modal-especialidad/modal-especialidad.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-especialidad',
  templateUrl: './listado-especialidad.component.html',
  styleUrls: ['./listado-especialidad.component.css']
})
export class ListadoEspecialidadComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'nombreEspecialidad',
    'descripcion',
    'activo',
    'acciones',
  ];

  dataInicial: Especialidad[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _especialidadServicio: EspecialidadService, 
    private _compartidoService: CompartidoService, private dialog: MatDialog) { }

  obtenerEspecialidades() {
    this._especialidadServicio.obtenerEspecialidades().subscribe({
      next: (data) => {
        if (data.isSuccessful) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginacionTabla;
        } else
          this._compartidoService.mostrarAlerta('No se encontraron datos', 'Advertencia!');
      },
      error: (e) => { }
    });
  }

  buscarEspecialidad(event: Event) {
    const busqueda = (event.target as HTMLInputElement).value;
    this.dataSource.filter = busqueda.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearEspecialidad() {
    this.dialog.open(ModalEspecialidadComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') this.obtenerEspecialidades()
      });
  }

  editarEspecialidad(especialidad: Especialidad) {
    this.dialog.open(ModalEspecialidadComponent, { disableClose: true, width: '400px', data: especialidad })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') this.obtenerEspecialidades()
      });
  }

  eliminarEspecialidad(especialidad: Especialidad) {
    Swal.fire({
      title: 'Desea Eliminar la Especialidad?',
      text: especialidad.nombreEspecialidad,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._especialidadServicio.eliminarEspecialidad(especialidad.id).subscribe({
          next: (data) => {
            if (data.isSuccessful) {
              this._compartidoService.mostrarAlerta('La especialidad fue eliminada', 'Completo');
              this.obtenerEspecialidades();
            } else {
              this._compartidoService.mostrarAlerta('No se pudo eliminar la especialidad', 'Error!');
            }
          },
          error: (e) => {}
        });
      }
    });
  }
  
  ngOnInit(): void {
    this.obtenerEspecialidades();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTabla;
  }
}
