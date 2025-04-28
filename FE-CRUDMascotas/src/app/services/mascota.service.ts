import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private _myAppUrl: string = environment.endpoint;
  private _myApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) {}
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this._myAppUrl}${this._myApiUrl}Ver`);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(
      `${this._myAppUrl}${this._myApiUrl}Ver/${id}`
    );
  }

  deleteMascota(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this._myAppUrl}${this._myApiUrl}Eliminar/${id}`
    );
  }

  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(
      `${this._myAppUrl}${this._myApiUrl}Agregar`,
      mascota
    );
  }

  updateMascota(id: number, mascota: Mascota): Observable<void> {
    return this.http.put<void>(
      `${this._myAppUrl}${this._myApiUrl}Editar/${id}`,
      mascota
    );
  }
}
