import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lugar } from '../interface/lugar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private basePath = 'http://localhost:8080/post';

  constructor(
    private http: HttpClient
  ) { }
   // metodos de crud api
   getLugaresApi() :Observable<Lugar[]>{
    return this.http.get<any>(`${this.basePath}/list`,{});
  }

  altaLugarApi(lugar: Lugar): Observable<any>{
    return this.http.post(`${this.basePath}/add`, lugar);
  }

  borrarLugarApi(id: string): Observable<any>{
    return this.http.delete(`${this.basePath}/${id}/delete`, {});
  }

  editarLugarApi(id: any, lugar: Lugar): Observable<any>{
    return this.http.put(`${this.basePath}/${id}/update`,lugar,{});
  }
  
}
