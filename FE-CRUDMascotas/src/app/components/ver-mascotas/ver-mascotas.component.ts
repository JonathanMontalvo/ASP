import { Component, OnDestroy, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../../interfaces/mascota';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-mascotas',
  standalone: false,
  templateUrl: './ver-mascotas.component.html',
  styleUrl: './ver-mascotas.component.css',
})
export class VerMascotasComponent implements OnInit, OnDestroy {
  id!: number;
  mascota!: Mascota;
  //mascota$!: Observable<Mascota>;
  loading: boolean;
  //routeSub!: Subscription;

  constructor(
    private _mascotaService: MascotaService,
    private _aRoute: ActivatedRoute
  ) {
    this.id = Number(this._aRoute.snapshot.paramMap.get('id')); //OBTENER ID POR URL
    this.loading = false;
  }
  ngOnDestroy(): void {
    //this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    //this.mascota$ = this._mascotaService.getMascota(this.id); PIPE ASYNC
    /*this.routeSub = this._aRoute.params.subscribe((data) => {
      this.id = data['id'];
      this.obtenerMascota();
    });*/
    this.obtenerMascota();
  }

  obtenerMascota() {
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe(
      (data) => {
        this.loading = false;
        this.mascota = data;
      },
      (error) => {
        alert(error);
      }
    );
  }
}
