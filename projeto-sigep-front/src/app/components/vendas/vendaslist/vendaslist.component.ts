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
          title: 'Atenção',
          icon: 'error',
          text: 'Ocorreu um erro inesperado.',
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
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.vendasService.excluir(venda.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Sucesso',
              icon: 'success',
              text: mensagem,
              confirmButtonText: 'Ok',
            });
            this.listar();
          },
          error: erro => {
            const errorMessage = erro.error || 'Ocorreu um erro inesperado.';
            Swal.fire({
              title: 'Atenção',
              icon: 'error',
              text: errorMessage,
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}

