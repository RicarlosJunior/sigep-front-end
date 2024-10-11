import { Produto } from "./produto";
import { Venda } from "./venda";

export class VendaProduto {

  venda:Venda | null = null;
  produto:Produto | null = null;
  quantidade:number | null = null;

}
