import { Component } from '@angular/core';
import { Produto } from '../../../models/produto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtoslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produtoslist.component.html',
  styleUrl: './produtoslist.component.scss'
})
export class ProdutoslistComponent {

  produtos: Produto[] = [];

  constructor(){
    let produto = new Produto();
    let produto2 = new Produto();
    let produto3 = new Produto();

    produto.id = 1
    produto.nome = "Caderno";
2
    produto2.id = 2
    produto2.nome = "Lapiz";

    produto3.id = 3
    produto3.nome = "Giz";


    this.produtos.push(produto);
    this.produtos.push(produto2);
    this.produtos.push(produto3);

  }

  excluir(){
    //Implementar
  }

}
