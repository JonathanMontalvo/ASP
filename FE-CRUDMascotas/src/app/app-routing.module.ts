import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotasComponent } from './components/ver-mascotas/ver-mascotas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listadoMascotas',
    pathMatch: 'full',
  },
  {path:'listadoMascotas', component:ListadoMascotasComponent},
  {path:'agregarMascota', component:AgregarEditarMascotaComponent},
  {path:'verMascota/:id', component:VerMascotasComponent},
  {path:'editarMascota/:id', component:AgregarEditarMascotaComponent},
  {
    path: '**',
    redirectTo: 'listadoMascotas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
