import { ProdutosService } from './../../../services/produtos.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './produtosdetails.component.html',
  styleUrl: './produtosdetails.component.scss'
})
export class ProdutosdetailsComponent {

 produto:Produto = new Produto();
 router = inject(ActivatedRoute);
 produtosService = inject(ProdutosService);
 routerNavegacao = inject(Router);


constructor(){
  let id = this.router.snapshot.params['id'];
  if(id > 0){
    this.consultar(id);
  }
}

 criar(){

  if(this.validarCamposProduto()){
    this.produtosService.criar(this.produto).subscribe({
      next: produto => {
        Swal.fire({
          title: "Produto cadastrado com sucesso!",
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.routerNavegacao.navigate(['admin/produtos'], { state: { produtoNovo: this.produto } });
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
 }


 alterar(){
  if(this.produto.id > 0){
    this.produtosService.alterar(this.produto.id, this.produto).subscribe({
      next: produto => {
        Swal.fire({
          title: "Produto alterado com sucesso!",
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.routerNavegacao.navigate(['admin/produtos'], { state: { produtoEditado: this.produto } });
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


}

 consultar(id: number){
  this.produtosService.consultar(id).subscribe({
    next: produtoConsultado => {
      this.produto = produtoConsultado;
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

 formatarValor(valor: number) {
  this.produto.valorUnitario = parseFloat(valor.toFixed(2)); // Garante duas casas decimais
}

validarCamposProduto(): boolean {
  let mensagem = ""; // String para armazenar mensagens

  if (!this.produto.nome) {
    mensagem += 'Campo nome inválido!<br><br>';
  }
  if (this.produto.quantidadeDisponivel === null || this.produto.quantidadeDisponivel <= 0) {
    mensagem += 'Campo quantidade disponível inválido!<br><br>';
  }
  if (this.produto.valorUnitario === null || this.produto.valorUnitario <= 0) {
    mensagem += 'Campo valor unitário inválido!<br><br>';
  }

  if (mensagem) {

    Swal.fire({
      title: 'Erros de Validação',
      html: `<div style="text-align: left;">${mensagem}</div>`,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return false;
  }
  return true;
}



}
