import { ProdutosService } from './../../../services/produtos.service';
import { Component, inject } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtoslist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './produtoslist.component.html',
  styleUrl: './produtoslist.component.scss'
})
export class ProdutoslistComponent {

  produtos: Produto[] = [];
  produtosService = inject(ProdutosService);

  constructor(){
    this.listar();
  }

  listar(){
    this.produtosService.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
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


  excluir(produto: Produto){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.excluir(produto.id).subscribe({
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
