import { VendasService } from './../../../services/vendas.service';
import { Component, inject } from '@angular/core';
import { Venda } from '../../../models/venda';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendaslist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vendaslist.component.html',
  styleUrl: './vendaslist.component.scss'
})
export class VendaslistComponent {

  vendas: Venda[] = []
  vendasService = inject(VendasService);

  constructor(){
    this.listar();
  }


  listar(){
    this.vendasService.listar().subscribe({
      next: vendas => {
        this.vendas = vendas;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro inesperado.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  excluir(venda: Venda){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vendasService.excluir(venda.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listar();
          },
          error: erro => {
            const errorMessage = erro.error || 'Ocorreu um erro inesperado.';
            Swal.fire({
              title: errorMessage,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}

