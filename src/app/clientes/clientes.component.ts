import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]=[
    {nombre:'Víctor', apellido:'Rubia', id:0, createAt:'1999-03-03', email:'victor@ugr.es'},
    {nombre:'Marina', apellido:'Hernández', id:1, createAt:'1999-12-29', email:'mhb@ugr.es'},
    {nombre:'Pedro', apellido:'Jiménez', id:2, createAt:'1999-11-10', email:'pjimenez@ugr.es'},
    {nombre:'Román', apellido:'Lewandowska', id:3, createAt:'1999-05-12', email:'rl12@ugr.es'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
