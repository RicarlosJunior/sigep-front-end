import { VendaProduto } from './../../../models/venda-produto';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../models/produto';
import { ProdutosService } from '../../../services/produtos.service';



@Component({
  selector: 'app-vendasprodutosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './vendasprodutosdetails.component.html',
  styleUrl: './vendasprodutosdetails.component.scss'
})
export class VendasprodutosdetailsComponent {

  vendaProduto: VendaProduto = new VendaProduto();
  produtos: Produto[] = [];
  produtosService = inject(ProdutosService);


  @Output() vendaProdutoSelecionado = new EventEmitter<any>();

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
          title: 'Ocorreu um erro inesperado.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }


  onProductChange() {
    console.log(this.vendaProduto.produto);
  }

  confirmar() {
    this.vendaProdutoSelecionado.emit(this.vendaProduto);
    this.fecharModal();
  }

  fecharModal() {
      const modal = document.getElementById('produtoVendaModal');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
  }


}
