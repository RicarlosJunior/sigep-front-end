import { ProdutosService } from './../../../services/produtos.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
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
      Swal.fire({
        title: 'Ocorreu um erro',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  });
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
        Swal.fire({
          title: 'Ocorreu um erro',
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
      Swal.fire({
        title: 'Ocorreu um erro',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  });
 }

 formatarValor(valor: number) {
  this.produto.valorUnitario = parseFloat(valor.toFixed(2)); // Garante duas casas decimais
}

}
