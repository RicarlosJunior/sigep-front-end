import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/produtos";

  constructor() { }




  criar(produto: Produto): Observable<Produto>{
    return this.http.post<any>(this.API, this.criarPayloadProduto(produto)).pipe(
      map(produto => ({
          id:produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          quantidadeDisponivel: produto.quantidade_disponivel,
          valorUnitario: produto.valor_unitario,
        }))
    );
  }

  alterar(id:number, produto: Produto): Observable<Produto>{
    return this.http.put<any>(this.API+"/"+id, this.criarPayloadProduto(produto)).pipe(
      map(produto => ({
          id:produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          quantidadeDisponivel: produto.quantidade_disponivel,
          valorUnitario: produto.valor_unitario,
        }))
    );
  }


 /* listar(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API);
  }*/

    listar(): Observable<Produto[]> {
      return this.http.get<any[]>(this.API).pipe(
        map(produtosRecebidos =>
          produtosRecebidos.map(produto => ({
            id:produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            quantidadeDisponivel: produto.quantidade_disponivel,
            valorUnitario: produto.valor_unitario,
          }))
        )
      );
    }


  excluir(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/"+id, {responseType: 'text' as 'json'});
  }

  consultar(id: number): Observable<Produto>{
    return this.http.get<any>(this.API+"/"+id).pipe(
      map(produto => ({
          id:produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          quantidadeDisponivel: produto.quantidade_disponivel,
          valorUnitario: produto.valor_unitario,
        }))
    );
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
