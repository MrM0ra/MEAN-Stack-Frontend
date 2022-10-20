import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';

const routes = [
    {path: '', component: ListProductComponent },
    {path: 'create-product', component: CreateProductComponent },
    {path: 'edit-product/:id', component: CreateProductComponent },
    {path: '**', redirectTo: ''}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
