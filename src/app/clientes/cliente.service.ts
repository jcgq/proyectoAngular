import { Injectable } from '@angular/core';
import {formatDate, registerLocaleData} from '@angular/common';
import { Cliente } from './cliente';
import { of,Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap }from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient, private router: Router) { }

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  getClientes(page: number): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) => {
        console.log("ClienteService: tag1");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }
      ),
      tap(response => {
        console.log("ClienteService: tag2");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        }
        )
      })
    );
  }

  create(cliente: Cliente):Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire('Error al crear el cliente', e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire('Error al obtener', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire('Error al modificar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }
  delete(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  
}
