import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

    productList: Product[] = []
    
  constructor(private productService: ProductService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getProducts()
    }

    getProducts(){
        this.productService.getProducts().subscribe(data => {
            this.productList = data;
        }, error => {
            console.log(error)
        })
    }

    deleteProduct(id: any){
        this.productService.deleteProduct(id).subscribe(data => {
            this.toastr.error("El producto fué eliminado con exito", "Producto Eliminado")
            this.getProducts();
        }, error => {
            console.log(error)
        })
    }

    getProduct(id:any){
        
    }

}
