import { VendaProduto } from './../../../models/venda-produto';
import { VendasService } from './../../../services/vendas.service';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
    this.listarProdutos();
  }

  abrirModal() {
    this.resetarVendaProduto();
    this.modalRef = this.modalService.open(this.modalVendaProduto);
  }

  fecharModal() {
    this.modalRef.close();
  }

  resetarVendaProduto() {
    this.vendaProduto = new VendaProduto();
  }


  adicionarVendaProduto() {
    const produtoJaAdicionado = this.venda.vendaProdutos.some(vp => vp.produto?.id === this.vendaProduto.produto?.id);
    if(produtoJaAdicionado){
      Swal.fire({
        title: 'Atenção!',
        icon: 'error',
        text: 'Produto já adicionado!',
        confirmButtonText: 'Ok',
      });
    }else if(!this.vendaProduto.quantidade ||
             !this.vendaProduto.produto){
      Swal.fire({
        title: 'Atenção',
        icon: 'error',
        text: 'Produto ou quantidade inválida!',
        confirmButtonText: 'Ok',
      });
    }else if(this.vendaProduto.produto.quantidadeDisponivel !== null &&
             this.vendaProduto.quantidade >  this.vendaProduto.produto.quantidadeDisponivel){
        Swal.fire({
          title: 'Atenção',
          icon: 'error',
          text: `A quantidade informada para o produto: ${this.vendaProduto.produto.nome} é maior que o saldo disponível para venda!`,
          confirmButtonText: 'Ok',
        });
    }else{
      this.venda.vendaProdutos.push(this.vendaProduto);
      this.venda.valorTotal = this.calcularValorTotalVenda();
    }
    this.fecharModal();
  }

  calcularValorTotalVenda():number{
     let valorTotalVenda = this.venda.vendaProdutos.reduce((valorTotal, vp) => {
        if (vp.produto && vp.produto.valorUnitario != null && vp.quantidade != null) {
          return valorTotal + (vp.produto.valorUnitario * vp.quantidade);
        }
        return valorTotal;
     },0);
     return parseFloat(valorTotalVenda.toFixed(2));
  }

  excluirVendaProduto(vendaProduto: VendaProduto){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        if(vendaProduto.venda !== null && vendaProduto.venda.id > 0){
          this.produtos.forEach(produto => {
            if(produto.id === vendaProduto.produto?.id &&
               produto.quantidadeDisponivel !== null && vendaProduto.quantidade !== null){
              produto.quantidadeDisponivel += vendaProduto.quantidade;
            }
          });
        }
        this.venda.vendaProdutos = this.venda.vendaProdutos.filter(vp => vp.produto?.id !== vendaProduto.produto?.id);
        this.venda.valorTotal = this.calcularValorTotalVenda();
      }
    });
  }




  listarProdutos(){
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

   criar(){
    if(this.validarCamposVenda()){
      this.vendasService.criar(this.venda).subscribe({
        next: venda => {
          Swal.fire({
            title: "Sucesso",
            icon: 'success',
            text: 'Venda realizada com sucesso!',
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['admin/vendas'], { state: { vendaNova: this.venda } });
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
   }


   alterar(){
    if(this.venda.id > 0 && this.validarCamposVenda()){
      this.vendasService.alterar(this.venda.id, this.venda).subscribe({
        next: venda => {
          Swal.fire({
            title: "Sucesso",
            icon: 'success',
            text: "Venda alterada com sucesso!",
            confirmButtonText: 'Ok',
          });
          this.routerNavegacao.navigate(['admin/vendas'], { state: { vendaEditada: this.venda } });
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
  }

   consultar(id: number){
    this.vendasService.consultar(id).subscribe({
      next: vendaConsultada => {
        this.venda = vendaConsultada;
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


  validarNumeroInteiro(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validarCamposVenda(): boolean {
    let mensagem = "";

    if (!this.venda.cliente) {
      mensagem += 'Campo cliente inválido!<br><br>';
    }
    if (!this.venda.valorTotal) {
      mensagem += 'Campo valor total inválido!<br><br>';
    }
    if (this.venda.vendaProdutos.length === 0) {
      mensagem += 'Para gerar/alterar uma venda é necessario informar ao menos um produto!<br><br>';
    }
    if(this.venda.vendaProdutos.some(vp => vp.quantidade != null && vp.quantidade <= 0)){
      mensagem += 'Existe produto(s) com quantidade informada inválida!<br><br>';
    }

    if (mensagem) {
      Swal.fire({
        title: 'Erros de Validação',
        html: `<div style="text-align: center;">${mensagem}</div>`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return false;
    }
    return true;
  }
  }

