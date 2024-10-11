import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Venda } from '../models/venda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VendaProduto } from '../models/venda-produto';


@Injectable({
  providedIn: 'root'
})
export class VendasService {

  http = inject(HttpClient);

  API = "http://localhost:8080/vendas";

  constructor() { }



  criar(venda: Venda): Observable<Venda>{
    return this.http.post<any>(this.API, this.criarPayloadVenda(venda)).pipe(
      map(venda => ({
          id:venda.id,
          cliente: venda.cliente,
          valorTotal: venda.valor_total,
          vendaProdutos: venda.venda_produtos,
        }))
    );
  }

  alterar(id:number, venda: Venda): Observable<Venda>{
    return this.http.put<any>(this.API+"/"+id, this.criarPayloadVenda(venda)).pipe(
      map(venda => ({
          id:venda.id,
          cliente: venda.cliente,
          valorTotal: venda.valor_total,
          vendaProdutos: venda.venda_produtos,
        }))
    );
  }


    listar(): Observable<Venda[]> {
      return this.http.get<any[]>(this.API).pipe(
        map(vendasRecebidas =>
          vendasRecebidas.map(venda => ({
            id:venda.id,
            cliente: venda.cliente,
            valorTotal: venda.valor_total,
            vendaProdutos: venda.venda_produtos,
          }))
        )
      );
    }


  excluir(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/"+id, {responseType: 'text' as 'json'});
  }

  consultar(id: number): Observable<Venda>{
    return this.http.get<any>(this.API+"/"+id).pipe(
      map(venda => ({
        id:venda.id,
        cliente: venda.cliente,
        valorTotal: venda.valor_total,
        vendaProdutos: venda.venda_produtos.map((vp: any) => ({
            produto: {
              id: vp.produto.id,
              nome: vp.produto.nome,
              descricao: vp.produto.descricao,
              quantidadeDisponivel: vp.produto.quantidade_disponivel,
              valorUnitario: vp.produto.valor_unitario,
              },
              quantidade: vp.quantidade,
          }))
      }))
    );
  }


  criarPayloadVenda(venda: any) {
    return {
      id: venda.id,
      cliente: venda.cliente,
      valor_total: venda.valorTotal,
      venda_produtos: venda.vendaProdutos.map((vp: any) => ({
        produto: {
          id: vp.produto.id,
          nome: vp.produto.nome,
          descricao: vp.produto.descricao,
          quantidade_disponivel: vp.produto.quantidadeDisponivel,
          valor_unitario: vp.produto.valorUnitario,
          },
          quantidade: vp.quantidade,
      }))
    };
  }



}
