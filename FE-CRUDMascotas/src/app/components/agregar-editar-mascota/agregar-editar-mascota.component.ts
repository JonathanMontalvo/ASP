import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-mascota',
  standalone: false,
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrl: './agregar-editar-mascota.component.css',
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  validatorsEdad = Validators.compose([
    Validators.required,
    Validators.min(0),
    Validators.max(30),
  ]);

  validatorsPeso = Validators.compose([
    Validators.required,
    Validators.min(0),
    Validators.max(30),
  ]);

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', this.validatorsEdad],
      peso: ['', this.validatorsPeso],
    });
    this.id = Number(this._aRoute.snapshot.paramMap.get('id')); //OBTENER ID POR URL
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  mensajeExito(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }

  obtenerMascota(id: number) {
    this._mascotaService.getMascota(id).subscribe((data) => {
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso,
      });
    });
  }

  agregarMascota(mascota: Mascota) {
    //Enviamos objeto al back-end -- AGREGAR
    this._mascotaService.addMascota(mascota).subscribe((data) => {
      this.mensajeExito('La mascota fue agregada con exito');
      this._router.navigate(['/listadoMascotas']);
    });
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    //Enviamos objeto al back-end -- EDITAR
    this._mascotaService.updateMascota(id, mascota).subscribe(() => {
      this.loading = false;
      this.mensajeExito('La mascota fue actualizada con exito');
      this._router.navigate(['/listadoMascotas']);
    });
  }

  agregarEditarMascota() {
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      edad: this.form.value.edad,
      raza: this.form.value.raza,
      color: this.form.value.color,
      peso: this.form.value.peso,
    };

    if (this.id != 0) {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }
}
