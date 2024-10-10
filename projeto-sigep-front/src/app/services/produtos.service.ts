import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/produtos";

  constructor() { }




  criar(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.API, this.criarPayloadProduto(produto));
  }

  alterar(id:number, produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(this.API+"/"+id, this.criarPayloadProduto(produto));
  }


  listar(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API);
  }

  excluir(id: number): Observable<Produto>{
    return this.http.delete<Produto>(this.API+"/"+id, {responseType: 'text' as 'json'});
  }

  consultar(id: number): Observable<Produto>{
    return this.http.get<Produto>(this.API+"/"+id);
  }

  criarPayloadProduto(produto: any) {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      quantidade_disponivel: produto.quantidadeDisponivel,
      valor_unitario: produto.valorUnitario,
    };
  }

}
