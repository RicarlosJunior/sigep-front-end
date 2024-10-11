import { VendasprodutosdetailsComponent } from './../../vendasprodutos/vendasprodutosdetails/vendasprodutosdetails.component';
import { VendaProduto } from './../../../models/venda-produto';
import { VendasService } from './../../../services/vendas.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Venda } from '../../../models/venda';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vendasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink, VendasprodutosdetailsComponent],
  templateUrl: './vendasdetails.component.html',
  styleUrl: './vendasdetails.component.scss'
})
export class VendasdetailsComponent {

  venda:Venda = new Venda();
  router = inject(ActivatedRoute);
  vendasService = inject(VendasService);
  routerNavegacao = inject(Router);



  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.consultar(id);
    }
  }

  abrirModal() {
    const modal = document.getElementById('produtoVendaModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  vendaProdutoSelecionado(vendaProduto: any) {
    console.log('venda Produto selecionado:', vendaProduto);
    this.venda.vendaProdutos.push(vendaProduto);

  }

  excluirVendaProduto(vendaProduto: VendaProduto){

  }

   criar(){

    if(this.validarCamposVenda()){
      this.vendasService.criar(this.venda).subscribe({
        next: venda => {
          Swal.fire({
            title: "Venda realizada com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['admin/vendas'], { state: { vendaNova: this.venda } });
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
    if(this.venda.id > 0){
      this.vendasService.alterar(this.venda.id, this.venda).subscribe({
        next: venda => {
          Swal.fire({
            title: "Venda alterado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['admin/vendas'], { state: { vendaEditada: this.venda } });
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
    this.vendasService.consultar(id).subscribe({
      next: vendaConsultada => {
        this.venda = vendaConsultada;
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
    this.venda.valorTotal = parseFloat(valor.toFixed(2)); // Garante duas casas decimais
  }

  validarCamposVenda(): boolean {
    let mensagem = ""; // String para armazenar mensagens

    if (!this.venda.cliente) {
      mensagem += 'Campo cliente inválido!<br><br>';
    }
   /*if (this.produto.quantidadeDisponivel === null || this.produto.quantidadeDisponivel <= 0) {
      mensagem += 'Campo quantidade disponível inválido!<br><br>';
    }
    if (this.produto.valorUnitario === null || this.produto.valorUnitario <= 0) {
      mensagem += 'Campo valor unitário inválido!<br><br>';
    }*/

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

