import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from '../../services/mascota.service';
import { error } from 'console';

@Component({
  selector: 'app-listado-mascotas',
  standalone: false,
  templateUrl: './listado-mascotas.component.html',
  styleUrl: './listado-mascotas.component.css',
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'edad',
    'raza',
    'color',
    'peso',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService
  ) {}
  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(() => {
      this.loading = false;
      this.mensajeExito('La mascota fue eliminada con exito');
      this.obtenerMascotas();
    });
  }

  mensajeExito(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert('Ocurrio un error');
      }
    );
  }
}
