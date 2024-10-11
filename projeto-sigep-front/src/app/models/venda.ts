import { VendaProduto } from "./venda-produto";

export class Venda {

  id!:number;
	cliente:string | null = null;
  valorTotal:number | null = null;
	vendaProdutos: VendaProduto[] = [];
}
