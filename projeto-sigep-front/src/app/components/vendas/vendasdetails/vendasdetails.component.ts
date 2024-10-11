import { VendaProduto } from './../../../models/venda-produto';
import { VendasService } from './../../../services/vendas.service';
import { Component, EventEmitter, inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Venda } from '../../../models/venda';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Produto } from '../../../models/produto';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
  selector: 'app-vendasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, RouterLink, MdbModalModule],
  templateUrl: './vendasdetails.component.html',
  styleUrl: './vendasdetails.component.scss'
})
export class VendasdetailsComponent {


 //ELEMENTOS DA MODAL
 modalService = inject(MdbModalService); // para conseguir abrir a modal
 @ViewChild("modalVendaProduto") modalVendaProduto!: TemplateRef<any>;
 modalRef!: MdbModalRef<any>;


  venda:Venda = new Venda();
  router = inject(ActivatedRoute);
  vendasService = inject(VendasService);
  routerNavegacao = inject(Router);

  vendaProduto: VendaProduto = new VendaProduto();
  produtos: Produto[] = [];
  produtosService = inject(ProdutosService);


  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.consultar(id);
    }
  }

  abrirModal() {
    this.listarProdutos();
    this.modalRef = this.modalService.open(this.modalVendaProduto);
  }

  adicionarVendaProduto() {
    this.venda.vendaProdutos.push(this.vendaProduto);
    this.fecharModal();
  }

  fecharModal() {
    this.modalRef.close();
  }


  excluirVendaProduto(vendaProduto: VendaProduto){

  }

  listarProdutos(){
    this.produtosService.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
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

