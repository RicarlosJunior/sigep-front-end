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
/*
    let produtoNovo = history.state.carroNovo;
    let produtoEditado = history.state.carroEditado;

    if (produtoNovo != null) {
      this.produtos.push(produtoNovo);
    }

    if (produtoEditado != null) {
      let indice = this.produtos.findIndex((p) => {
        return p.id == produtoEditado.id;
      });
      this.produtos[indice] = produtoEditado;
    }
*/
  }

  listar(){
    this.produtosService.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
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
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.excluir(produto.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listar();
          },
          error: erro => {
            Swal.fire({
              title: erro.error?.mensagem ||'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}
