import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;

  constructor(private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params =>{
    let page = +params.get('page');
    if(!page){
      page=0;
    }
    this.clienteService.getClientes(page).pipe(
      tap(response => {
        console.log('ClienteService: tap3');
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        });
        
      })
    ).subscribe(response => {
      this.clientes = response.content as Cliente[],
      this.paginador = response;
    });
  }
    );
  }

  delete(cliente: Cliente):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de lo que quieres hacer?',
      text: `¿Seguro que quieres eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Eliminalo!',
      cancelButtonText: 'No, ¡cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Eliminado',
              `El cliente ${cliente.nombre} ha sido eliminado con éxito`,
              'success'
            )
          }
        )
        
      }
    })
  }

}
