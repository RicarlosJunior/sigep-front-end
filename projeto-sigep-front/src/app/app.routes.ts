import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { ProdutoslistComponent } from './components/produtos/produtoslist/produtoslist.component';
import { ProdutosdetailsComponent } from './components/produtos/produtosdetails/produtosdetails.component';
import { VendasdetailsComponent } from './components/vendas/vendasdetails/vendasdetails.component';
import { VendaslistComponent } from './components/vendas/vendaslist/vendaslist.component';


export const routes: Routes = [
  {path: "", redirectTo:"admin", pathMatch:'full'},
  {path: "admin", component: PrincipalComponent, children :[
    {path: "produtos", component: ProdutoslistComponent},
    {path: "produtos/criar", component: ProdutosdetailsComponent},
    {path: "produtos/alterar/:id", component: ProdutosdetailsComponent},
    {path: "vendas", component: VendaslistComponent},
    {path: "vendas/criar", component: VendasdetailsComponent},
    {path: "vendas/alterar/:id", component: VendasdetailsComponent},
  ]},

];
